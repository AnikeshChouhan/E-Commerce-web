// register
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      success: false,
      message: "User Already exist with the same email please try again",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "registertion Successfully",
      // myUser: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error Occured register",
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email });

    if (!exist) {
      res.status(404).json({
        success: false,
        message: `User Doesn't exist ! please Register first  `,
      });
    }
    const checkPassword = await bcrypt.compare(password, exist.password);
    console.log(checkPassword);
    if (!checkPassword) {
      res.status(401).json({
        success: false,
        message: `password is incorrect ! Please try again`,
      });
    }
    const token = jwt.sign(
      {
        id: exist._id,
        role: exist.role,
        email: exist.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true }).json({
      success: "true",
      message: "Login Successfully",
      user: {
        email: exist.email,
        role: exist.role,
        id: exist._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Some Errror Accured Login `,
    });
  }
};
//logout
// auth- middlewares
