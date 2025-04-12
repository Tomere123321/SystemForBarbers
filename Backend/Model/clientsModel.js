const mongoose = require("mongoose");


  const clientSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      appointments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
      ],
    },
    {
      timestamps: true 
    }
  );


const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;