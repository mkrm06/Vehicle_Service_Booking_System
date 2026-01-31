const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user);

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/seed-admin
const seedAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashed, role: "admin" });

    return res.status(201).json({
      message: "Admin created",
      user: { id: newUser._id, username: newUser.username, role: newUser.role },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { login, seedAdmin };
