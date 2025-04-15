const appointmentsService = require("../Service/appointmentsService");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await appointmentsService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
    console.log("Error fetching appointments:", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentsService.getAppointmentById(appointmentId );
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment by Id", error });
    console.log("Error fetching appointment by Id:", error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newAppointment = req.body;
    const createdAppointment = await appointmentsService.createAppointment( newAppointment);
    return res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
    console.log("Error creating appointment:", error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id; const updatedAppointment = req.body 
    const appointment = await appointmentsService.updatedAppointment(appointmentId,updatedAppointment);
    return res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
    console.log("Error updating appointment:", error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deleteAppointment = await appointmentsService.deleteAppointment(appointmentId);
    return res.status(201).json(deleteAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
    console.log("Error deleting appointment:", error.message);
  }
});

module.exports = router;
