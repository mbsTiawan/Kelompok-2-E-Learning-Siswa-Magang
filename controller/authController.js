const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role, Siswa } = require('../models');

const authController = {};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { userName: username },
      include: [{ model: Role, as: 'role' }],
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const siswa = await Siswa.findOne({
      where: {
        id_user: user.id
      }
    })

    let siswaId = null;
    if (siswa) {
      siswaId = siswa.id
    }

    console.log(siswaId);
    const payload = { username: user.userName, role: user.role.nama_role };

    if (siswaId !== null) {
      payload.siswaId = siswaId
    }

    const accessToken = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

    res.json({
      message: 'Login successful. Copy the following token to access based on your role:',
      accessToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
authController.register = async (req, res) => {
  try {
    const { username, password, id_role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { userName: username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user
    const newUser = await User.create({ userName: username, password, id_role });

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// authController.js

// ... (existing code)

authController.logout = async (req, res) => {
  try {
    // You may need to implement a session management system or token blacklist here
    // For simplicity, let's assume you are using a token blacklist array
    const { user } = req;
    // Assuming you have a global array to store blacklisted tokens
    // Note: In a production environment, use a more secure storage solution
    global.blacklistedTokens = global.blacklistedTokens || [];
    global.blacklistedTokens.push(req.header('Authorization').replace('Bearer ', ''));
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (existing code)


module.exports = authController;
