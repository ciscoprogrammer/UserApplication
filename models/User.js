const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    profileImage: { type: String }  // Path to the image file
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
