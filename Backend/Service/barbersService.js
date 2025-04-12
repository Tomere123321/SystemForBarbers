const barbersModel = require("../Model/barbersModel");

const getAllBarbers = async () => {
  return await barbersModel.find({});
};

const getBarberById = async (id) => {
  return await barbersModel.findById(id);
};

const createBarber = async (newBarber) => {
  const barber = new barbersModel(newBarber);
  await barber.save();
  return "Barber created successfully";
};

const updateBarber = async (id, updatedBarber) => {
  await barbersModel.findByIdAndUpdate(id, updatedBarber);
  return "Barber updated successfully";
};

const deleteBarber = async (id) => {
  await barbersModel.findByIdAndDelete(id);
  return "Barber deleted successfully";
};

module.exports = {
  getAllBarbers,
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber,
};
