import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(req.header);
    const isAlreadyThere = await User.findOne({ email });
    if (isAlreadyThere) {
      return res.status(400).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const newUser = new User(req.body);

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({ error: "Invalid credentials.." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
