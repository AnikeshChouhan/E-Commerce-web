// register
import bcrypt from "bcryptjs";
import { User } from "../../models/User";
export const registerUser = (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = bcrypt.hash(password);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    newUser.save();
    res.status.json({
      success: "true",
      message: "registertion Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "some Error Occured",
    });
  }
};

//login
//logout
// auth- middlewares
