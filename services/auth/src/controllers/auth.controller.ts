
import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/trycatch.middleware.js";

export const loginUser = TryCatch(async(req,res)=>{const { email, name, picture } = req.body;
    if (!email || !name || !picture) {
      return res
        .status(400)
        .json({ message: "Email, name and picture are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, image: picture });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      return res.status(500).json({ message: "JWT configuration missing" });
    }
    const payload = { id: user._id.toString(), email: user.email };  

   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
   res.status(200).json({ message: "Login successful", token , user});})
