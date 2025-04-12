const express = require("express");
const clientModel = require("../Model/clientsModel");
const router = express.Router();
const generateToken = require("../Token/JWT");

router.post("/register", async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required!" });
    }

    if (phone.length < 10 || phone.length > 10) {
      return res
        .status(400)
        .json({ message: "Phone number must be 10 digits!" });
    }

    if (!phone.startsWith("0")) {
      return res.status(400).json({ message: "Invalid Phone Number!" });
    }

    const isExist = await clientModel.findOne({ phone  });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "This Phone Number Is alreasy Exist!" });
    }

    const newClient = new clientModel({ name, phone });
    await newClient.save();

    const token = generateToken(newClient)
    
    return res
      .status(201)
      .json({ 
        message: "Client registered successfully!", 
        newClient, 
        token });
  } catch (error) {
    res.status(500).json({ message: "Error registering client", error });
    console.log("Error registering client:", error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "phone are required!" });
    }

    if (phone.length < 10 || phone.length > 10) {
      return res
        .status(400)
        .json({ message: "Phone number must be 10 digits!" });
    }
    if (!phone.startsWith("0")) {
      return res.status(400).json({ message: "Invalid Phone Number!" });
    }

    const Client = await clientModel.findOne({ phone });
    if (!Client) {
      return res
        .status(400)
        .json({ message: "This Phone Number Does Not Exist!" });
    }

    const token = generateToken(Client);

    return res
      .status(200)
      .json({ message: "Client logged in successfully!",
         Client,
          token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
    console.log("Error logging in:", error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Client logged out successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
    console.log("Error logging out:", error.message);
  }
});

module.exports = router;
