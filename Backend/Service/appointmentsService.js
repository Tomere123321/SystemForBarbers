const appointmentsModel = require("../Model/appointmentsModel");

const getAllAppointments = async () => {
  return await appointmentsModel.find({}).populate("barber").populate("client", "phone name"); 
};

const getAppointmentById = async (id) => {
  return await appointmentsModel.findById(id).populate("barber").populate("client", "phone name"); 
};

const createAppointment = async (newAppointment) => {
  const appointment = new appointmentsModel(newAppointment);
  await appointment.save();
  return { message: "appointment created successfully" };
};

const updatedAppointment = async (id, updatedAppointments) => {
  await appointmentsModel.findByIdAndUpdate(id, updatedAppointments);
  return { message: "Appointments updated successfully" };
};

const deleteAppointment  = async (id) => {
  await appointmentsModel.findByIdAndDelete(id);
  return { message: "Appoinment deleted successfully" };
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updatedAppointment,
  deleteAppointment ,
};
