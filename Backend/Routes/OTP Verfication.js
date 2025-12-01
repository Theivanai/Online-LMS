const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Temporary store for OTPs
let otpStore = {};

// Send OTP
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // valid 5 min

        // Send via nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yourgmail@gmail.com",
                pass: "yourapppassword", // Use App Password
            },
        });

        await transporter.sendMail({
            from: "yourgmail@gmail.com",
            to: email,
            subject: "Your OTP for Password Reset",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });

        res.json({ message: "OTP sent to your email" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Verify OTP + Reset Password
router.post("/verify-otp", async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        if (!otpStore[email]) return res.status(400).json({ message: "No OTP found" });

        const { otp: validOtp, expires } = otpStore[email];
        if (Date.now() > expires) {
            delete otpStore[email];
            return res.status(400).json({ message: "OTP expired" });
        }
        if (otp !== validOtp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        delete otpStore[email];

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
