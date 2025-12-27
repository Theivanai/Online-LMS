const router = require("express").Router();
const User = require("../Models/User");
const PaymentHistory = require('../Models/PaymentHistory');
const verifyToken = require("../Middleware/Auth");
const bcrypt = require('bcryptjs');


//change password
router.put('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
});



// User profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email userId profileImage');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});




// router.get('/book-history', verifyToken, async (req, res) => {
//     try {
//         //To fetch user details
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         //match custom userID
//         const history = await PaymentHistory.find({ userId: user.userId });

//         const result = history.map((entry, index) => ({
//             id: index + 1,
//             userID: entry.userId,
//             title: entry.bookTitle,
//             startDate: entry.startDate,
//             endDate: entry.endDate,
//             status: entry.status,
//             amountPaid: entry.amountPaid
//         }));

//         res.json(result);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching book history' });
//     }
// });

// router.get('/book-history', verifyToken, async (req, res) => {
//     try {
//         // Fetch user details
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const now = new Date();

//         // Only fetch active (non-expired) purchases
//         const history = await PaymentHistory.find({
//             userId: user.userId,
//             endDate: { $gt: now }  // filter out expired
//         });

//         // Format results
//         const result = history.map((entry, index) => ({
//             id: index + 1,
//             userID: entry.userId,
//             title: entry.bookTitle,
//             startDate: entry.startDate,
//             endDate: entry.endDate,
//             status: entry.status,
//             amountPaid: entry.amountPaid
//         }));

//         res.json(result);
//     } catch (err) {
//         console.error("Book history fetch error:", err);
//         res.status(500).json({ message: 'Error fetching book history' });
//     }
// });

// router.get('/book-history', verifyToken, async (req, res) => {
//     try {
//         //  Fetch logged-in user from token
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const now = new Date();

//         //  Get only active (not expired) purchases
//         const history = await PaymentHistory.find({
//             userId: user.userId,
//             endDate: { $gt: now }
//         });

//         if (!history.length) {
//             return res.status(200).json([]); // No active books
//         }

//         // Format final response
//         const formatted = history.map((entry, index) => ({
//             id: index + 1,
//             userID: entry.userId,
//             title: entry.bookTitle,
//             startDate: entry.startDate,
//             endDate: entry.endDate,
//             status: entry.status,
//             amountPaid: entry.amountPaid
//         }));

//         return res.status(200).json(formatted);

//     } catch (err) {
//         console.error("Book history fetch error:", err);
//         return res.status(500).json({ message: 'Error fetching book history' });
//     }
// });


router.get('/book-history', verifyToken, async (req, res) => {
    try {
        const now = new Date();

        const history = await PaymentHistory.find({
            userId: req.user.id,     // ✔ Mongo _id string (same as save)
            endDate: { $gt: now }
        });

        const result = history.map((entry, index) => ({
            id: index + 1,
            userID: entry.userId,
            title: entry.bookTitle,
            startDate: entry.startDate,
            endDate: entry.endDate,
            status: entry.status,
            amountPaid: entry.amountPaid
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book history' });
    }
});



module.exports = router;