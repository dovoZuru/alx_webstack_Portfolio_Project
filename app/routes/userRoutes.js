const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const { getUserProfile, getAllUsers } = require('../controllers/userController');
const limiter = require('../middleware/rateLimitMiddleware');
const router = express.Router();

router.get('/profile', authenticateUser, authorizeRole('user'), limiter, getUserProfile);
router.get('/', authenticateUser, authorizeRole('admin'), limiter, getAllUsers);

module.exports = router;
