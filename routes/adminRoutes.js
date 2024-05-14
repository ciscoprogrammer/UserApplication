const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authenticate');

// Admin login
router.post('/login', adminController.adminLogin);

// To Get all users - secured by admin authentication
router.get('/users', authenticateAdmin, adminController.getAllUsers);

// To Create a new admin - secured by admin authentication
router.post('/', authenticateAdmin, adminController.createAdmin);

module.exports = router;
