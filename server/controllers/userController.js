const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Handle unique constraint violation (e.g., duplicate username or email)
        res.status(400).json({ error: 'Username or email is already in use.' });
      } else {
        // Handle other types of errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
};
