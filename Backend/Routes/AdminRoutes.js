const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const adminController = require('../controllers/AdminController');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const AdminUser = require('../Models/AdminUser');
require("dotenv").config();

// Admin register
router.post('/admin-register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6-8 characters').isLength({ min: 6, max: 8 })
], adminController.registerAdmin);

// Admin & user login
router.post('/adminlogin', adminController.loginAdmin);
router.post('/user/login', adminController.loginUser);

// Forgot password
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        // ✅ Fixed - renamed variable to avoid conflict with model name
        const user = await AdminUser.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.tokenExpiry = Date.now() + 3600000; // 1hr
        await user.save({ validateBeforeSave: false });

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetURL = `http://localhost:3000/resetpassword/${token}`;
        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset",
            html: `<p>Click the link to reset password: <a href="${resetURL}">Reset Password</a></p>`,
        });

        res.json({ message: "Reset link sent to your email" });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Reset password
router.post("/resetpassword/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await AdminUser.findOne({ 
            resetToken: token, 
            tokenExpiry: { $gt: Date.now() } 
        });
        if (!user) return res.status(400).json({ message: "Token is invalid or expired" });

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;