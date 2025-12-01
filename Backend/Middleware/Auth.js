const jwt = require('jsonwebtoken');
// const express = require("express");
// const user = require("../Models/User");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");
// const AdminUser=require('../Models/AdminUser');



// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) return res.status(403).json("Token is not valid");
//             req.user = { id: user.id };
//             next();
//         });
//     } else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


const verifyToken = (req, res, next) => {
    let token = null;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Fallback: check token from query param (for iframe)
    if (!token && req.query.token) {
        token = req.query.token;
    }

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id, userId: decoded.userId };
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};


//Middleware for Admin
const verifyTokenAndAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized as admin" });
        }

        // User is admin — proceed
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};




// Middleware for logged-in users (non-admin)
const verifyTokenAndUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json("Access Denied");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'user') return res.status(403).json("User access required");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json("Invalid Token");
    }
};



module.exports =
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUser;


// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         const token = authHeader.split(' ')[1];
//         console.log("Extracted token:", token);

//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 console.error("JWT verification error:", err.message); // Add this line
//                 return res.status(403).json("Token is not valid");
//             }

//             req.user = { id: user.id };
//             next();
//         });
//     } else {
//         return res.status(401).json("You are not authenticated");
//     }
// };

// module.exports = verifyToken;
