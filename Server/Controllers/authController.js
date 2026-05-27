const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');


// 🔹 REGISTER
const register = async (req, res) => {
  const { name, email, phone_number, password } = req.body;

  // Basic validation
  if (!name || !email || !phone_number || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate UUID
    const id = uuidv4();

    // Save user
    await userModel.createUser(
      id,
      name,
      email,
      phone_number,
      hashedPassword
    );

    res.json({ message: 'User registered ✅' });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// 🔹 LOGIN (email only)
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    res.json({
      message: 'Login successful ✅',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// 🔥 VERY IMPORTANT EXPORT
module.exports = {
  register,
  login,
};