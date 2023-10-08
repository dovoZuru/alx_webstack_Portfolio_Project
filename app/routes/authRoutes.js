const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login, authenticateUser, authorizeRole);

module.exports = router;
