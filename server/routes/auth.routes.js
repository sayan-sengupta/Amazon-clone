const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

const registerValidation = [
  body('userName').trim().notEmpty().withMessage('userName is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { userName, email, password } = req.body;

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (user_name, email, password_hash) VALUES (?, ?, ?)',
      [userName, email, passwordHash]
    );

    return res.status(201).json({
      message: 'User registered successfully',
      userName,
      email,
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Registration failed' });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT id, user_name, email, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userName: user.user_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      token,
      email: user.email,
      userName: user.user_name,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
}

async function getMe(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_name, email, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    return res.json({
      id: user.id,
      userName: user.user_name,
      email: user.email,
      createdAt: user.created_at,
    });
  } catch (err) {
    console.error('Get me error:', err);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
}

async function legacyProfile(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_name, email FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ result: 'invalid token' });
    }

    const user = rows[0];
    return res.json({
      message: 'login success',
      authData: {
        user: {
          userId: user.id,
          userName: user.user_name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
}

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', verifyToken, getMe);

module.exports = router;
module.exports.register = [registerValidation, register];
module.exports.login = [loginValidation, login];
module.exports.getMe = getMe;
module.exports.legacyProfile = legacyProfile;
