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
    return res.status(201).json({
      success: true,
      message: "registertion Successfully",
      // myUser: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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
    console.log(exist.userName);
    if (!exist) {
      return res.status(404).json({
        success: false,
        message: `User Doesn't exist ! please Register first  `,
      });
    }
    const checkPassword = await bcrypt.compare(password, exist.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: `password is incorrect ! Please try again`,
      });
    }
    const token = jwt.sign(
      {
        id: exist._id,
        role: exist.role,
        email: exist.email,
        userName: exist.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: "true",
        message: "Login Successfully",
        user: {
          email: exist.email,
          role: exist.role,
          id: exist._id,
          userName: exist.userName,
        },
      });
  } catch (error) {
    res.json({
      success: false,
      message: `Some Errror Accured Login `,
    });
  }
};
//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Successfully",
  });
};
// auth- middlewares
export const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }
  try {
    const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }
};
