const clientService = require("../Service//clientsService");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
    console.log("Error fetching clients:", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const clients = await clientService.getClientById(id);
    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients by Id", error });
    console.log("Error fetching clients: by Id ", error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newclients = req.body;
    const createdclients = await clientService.createClient(newclients);
    return res.status(201).json(createdclients);
  } catch (error) {
    res.status(500).json({ message: "Error creating clients", error });
    console.log("Error creating clients:", error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedclients = req.body;
    const updatedclientsResponse = await clientService.updateClient(
      id,
      updatedclients
    );
    return res.status(200).json(updatedclientsResponse);
  } catch (error) {
    res.status(500).json({ message: "Error updating clients", error });
    console.log("Error updating clients:", error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedclients = await clientService.deleteClient(id);
    return res.status(200).json(deletedclients);
  } catch (error) {
    res.status(500).json({ message: "Error deleting clients", error });
    console.log("Error deleting clients:", error.message);
  }
});

module.exports = router;
