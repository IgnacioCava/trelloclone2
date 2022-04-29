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

    const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  
    const validation = {
      email: {test: emailRegexp.test(email), error:'invalid email format'}, 
      username: {test: username?.length>=3, error: 'username must be at least 3 characters'}, 
      password: {test: password.length>=6, error:'password must be at least 6 characters'}
    };
    
    const missingFields = [];
    const emptyFields = [];
    const validationErrors = []
    
    for (let key in { username, email, password }) {
      if (req.body[key] === '') emptyFields.push(key);
      if (!req.body.hasOwnProperty(key)) missingFields.push(key);
      if (!validation[key].test) validationErrors.push(validation[key].error);
    }

    if(missingFields+emptyFields+validationErrors){
      return res.status(400).json({ 
        error: 
          (missingFields.length?
          `Missing required fields: ${missingFields.join(', ')+'. '}` : '') 
        + (emptyFields.length?
          `Empty fields: ${emptyFields.join(', ')+'. '}` : '')
        + (validationErrors.length?
          `Validation errors: ${validationErrors.join(', ')+'.'}` : '')
        });
    }

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
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user) return res.status(400).json({ error: 'Invalid credentials' })

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
