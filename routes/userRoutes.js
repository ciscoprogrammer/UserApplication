const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const  upload  = require('../middleware/upload');

router.post('/register', upload.single('profileImage'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify/:id', userController.verifyEmail);


module.exports = router;
