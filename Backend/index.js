require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_DB_URL, {}).then(() => {console.log("Connected to DB"); }).catch((err) => {
  console.error("Error connecting to DB:", err.message);
  });

  const barbersController = require("./Controller/barbersController");
app.use("/barbers", barbersController);

  const appointmentsController = require("./Controller/appointmentsController"); 
app.use("/appointments", appointmentsController);

  const clientsController = require("./Controller/clientsController");
  app.use("/clients", clientsController);

const authController = require("./Controller/authControllers");
app.use("/auth", authController);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
