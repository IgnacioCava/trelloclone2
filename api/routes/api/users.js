const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../../models/User');

// Get users with email regex
router.get('/:input', auth, async (req, res) => {
  try {
    const email = new RegExp(req.params.input, 'i');
    const users = await User.find({email}).select('-password');
    res.json(users.filter((user) => user.id !== req.user.id));

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
