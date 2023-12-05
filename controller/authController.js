const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Login } = require('../models');

const authController = {};

// Login
authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Login.findOne({ where: { username } });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', accessToken });
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Register
authController.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await Login.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = await Login.create({ username, password: hashedPassword });

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authController;
