// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', async (req, res) => {
  try {
    // Log the incoming registration request data
    console.log('Received registration request:', req.body);

    // Call the register function in the user controller
    await userController.register(req, res);

    // Log success message
    console.log('Registration successful');
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
