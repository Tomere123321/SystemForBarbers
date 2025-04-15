// // write a middleware fucntion that checks if the user is authenticated and if the user is an barber 
// // if not send a 401 error and if the user is authenticated and is a barber continue to the next middleware

// const jwt = require("jsonwebtoken");
// const Barber = require("../Model/barberModel");
// const User = require("../Model/userModel");
// const { JWT_SECRET } = process.env;

// const protectedRoutes = async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
    
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
    
//         // Check if the user is a barber
//         const barber = await Barber.findById(req.user.id);
//         if (!barber) {
//         return res.status(401).json({ message: "Unauthorized" });
//         }
    
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// }

// module.exports = protectedRoutes;