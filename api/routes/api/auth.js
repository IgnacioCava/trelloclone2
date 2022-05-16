const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../../models/User');

// Register user
router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    try {
      // See if user exists-----
      if (await User.findOne({ email })) return res.status(400).json({ error: 'User already exists' });

      // Register new user
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      });

      await user.save();

      // Return jsonwebtoken
      jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// Login user & get token
router.post( '/login', async (req, res) => {

  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: `Missing fields: ${[email?'':'email', password?'':'password'].filter(e=>e).join(', ')}.` });
  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password);

    // Check for email and password match
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    // Return jsonwebtoken
    jwt.sign(
      { user: { id: user.id, } },
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
  }
);

// Get user though auth token
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    user? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
