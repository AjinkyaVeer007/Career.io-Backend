import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, userType, password } = req.body;

    if (!name || !email || !userType || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
        status: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
        status: false,
      });
    }

    const encrptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      userType,
      password: encrptedPassword,
    });

    return res.status(200).json({
      message: "User Registered Successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to register user",
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
        status: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        status: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect password",
        status: false,
      });
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to login user",
      status: false,
    });
  }
};

export const changepassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        status: false,
      });
    }

    const encrptedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: encrptedPassword,
    });

    return res.status(200).json({
      message: "Password changed successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to change password",
      status: false,
    });
  }
};
