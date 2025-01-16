const User = require("../models/user");
const authService = require("../utils/authService");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await User.create({ fullName, email, password, role });
    const token = authService.generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = authService.generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
