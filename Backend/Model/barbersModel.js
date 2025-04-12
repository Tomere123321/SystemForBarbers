const mongoose = require("mongoose");

const barbersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: [String], required: true },
  price: { type: Number, required: true },
});

const barbersModel = mongoose.model("barber", barbersSchema);

module.exports = barbersModel;
