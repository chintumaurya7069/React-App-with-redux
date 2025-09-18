import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  const { firstName, lastName, email, userName } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already Register", success: false });

    user = await User.create({
      firstName,
      lastName,
      email,
      userName,
    });
    res.json({
      message: "User Register Successfully...!",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;

  try {
    const existingUsers = await User.find({
      $or: [{ email }, { userName }],
    });

    let emailExists = false;
    let userNameExists = false;

    existingUsers.forEach((user) => {
      if (user.email === email) emailExists = true;
      if (user.userName === userName) userNameExists = true;
    });

    if (emailExists || userNameExists) {
      return res.status(409).json({
        message: "Validation error",
        emailExists,
        userNameExists,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
    });

    res.status(201).json({
      message: "User registered successfully!",
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);

    const user = await User.findOne(
      isEmail ? { email: login } : { userName: login }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({
      message: `Welcome ${user.firstName}`,
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    exports.json(error.message);
  }
};

export const getUsersBYId = async (req, res) => {
  const { userId } = req.params;
  try {
    let users = await User.findById(userId);
    res.json(users);
  } catch (error) {
    exports.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, password, number } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      password,
      number,
    });

    res.json({
      message: "User updated successfully!",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const removeUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ message: "User removed", success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
