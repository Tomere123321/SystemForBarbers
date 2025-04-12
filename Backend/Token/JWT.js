const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (client) => {
  return jwt.sign(
    { id: client._id, name: client.name, phone: client.phone }, 
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};


module.exports = generateToken;