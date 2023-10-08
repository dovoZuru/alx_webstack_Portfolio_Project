const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const { initiateTransfer, getAllTransfers } = require('../controllers/transferController');
const limiter = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/', authenticateUser, authorizeRole('user'), limiter, initiateTransfer);
router.get('/', authenticateUser, authorizeRole('admin'), limiter, getAllTransfers);

module.exports = router;
