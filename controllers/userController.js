const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');


// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.registerUser = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const profileImage = req.file.path;  
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileRegex = /^[6789]\d{9}$/;
    

    try {
        // Validate email
        if (!emailRegex.test(email)) {
            return res.status(400).send('Invalid email format');
        }

        // Validate mobile number
        if (!mobileRegex.test(mobile)) {
            return res.status(400).send('Invalid mobile number format');
        }
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            profileImage,
            isVerified: false  // Set to false until the user verifies via email
        });

        // Save the user
        await user.save();

        // Send verification email
        const verificationLink = `http://<your-domain>/api/users/verify/${user._id}`;
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Please verify your email',
            text: `Click this link to verify your email: ${verificationLink}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Verification email sent: ' + info.response);
            }
        });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Ensure user is verified
        if (!user.isVerified) {
            return res.status(401).send('Please verify your email first');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.isVerified = true;
        await user.save();
        res.send('Email verified successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
