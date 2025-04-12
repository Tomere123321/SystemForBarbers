const clientModel = require("../Model/clientsModel");

const getAllClients = async () => {
  return await clientModel.find({});
};

const getClientById = async (id) => {
  return await clientModel.findById(id);
};

const createClient = async (newClient) => {
  const client = new clientModel(newClient);
  await client.save();
  return "Client created successfully"
};

const updateClient = async (id, updatedClient) => {
  await clientModel.findByIdAndUpdate(id, updatedClient);
  return  "Client updated successfully" 
};

const deleteClient = async (id) => {
  await clientModel.findByIdAndDelete(id);
  return  "Client deleted successfully" 
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
