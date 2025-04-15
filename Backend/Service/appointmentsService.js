const appointmentsModel = require("../Model/appointmentsModel");
const barbersModel = require("../Model/barbersModel");
const clientModel = require("../Model/clientsModel");

const getAllAppointments = async () => {
  return await appointmentsModel
    .find({})
    .populate("barber")
    .populate("client", "phone name");
};

const getAppointmentById = async (id) => {
  return await appointmentsModel
    .findById(id)
    .populate("barber")
    .populate("client", "phone name");
};

const createAppointment = async (newAppointment) => {
  const appointment = new appointmentsModel(newAppointment);
  const appointmentDate = new Date(newAppointment.date);
  const currentDate = new Date();
  
  if (appointmentDate.getTime() <= currentDate.getTime()) {
    return { error: "Appointment date and time has already passed" };
  }
  const count = await appointmentsModel.countDocuments();
  if (count >= 20) {
    await appointmentsModel.deleteMany({});
    await clientModel.updateMany({}, { $set: { appointments: [] } });
    await barbersModel.updateMany({}, { $set: { appointments: [] } });
  }
  await appointment.save();

  const clientId = newAppointment.client;
  const barberId = newAppointment.barber;

  if (!clientId || !barberId) {
    return { error: "Missing client or barber ID" };
  }

  const client = await clientModel.findById(clientId);
  const barber = await barbersModel.findById(barberId);

  if (!client || !barber) {
    return { error: "Client or Barber not found" };
  }

  client.appointments.push(appointment._id);
  barber.appointments.push(appointment._id);

  await client.save();
  await barber.save();

  return {
    message: "Appointment created and linked to client and barber",
    appointmentId: appointment._id,
  };
};

const updatedAppointment = async (id, updatedAppointments) => {
  await appointmentsModel.findByIdAndUpdate(id, updatedAppointments);
  return { message: "Appointments updated successfully", appointmentId: id };
};

const deleteAppointment = async (id) => {
  await appointmentsModel.findByIdAndDelete(id);

  const client = await clientModel.findOne({ appointments: id });
  if (client) {
    client.appointments = client.appointments.filter(
      (appointmentId) => appointmentId.toString() !== id
    );
    await client.save();
  }

  const barber = await barbersModel.findOne({ appointments: id });
  if (barber) {
    barber.appointments = barber.appointments.filter(
      (appointmentId) => appointmentId.toString() !== id
    );
    await barber.save();
  }

  return { message: "Appointment deleted successfully" };
};


module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updatedAppointment,
  deleteAppointment,
};
