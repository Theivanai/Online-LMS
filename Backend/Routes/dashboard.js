// const express = require('express');
// const router = express.Router();
// const Book = require('../Models/Book');
// const paymenthistory = require('../Models/PaymentHistory');
// const verifyToken = require('../Middleware/Auth');

// function getLast7Days() {
//     const days = [];
//     for (let i = 6; i >= 0; i--) {
//         const d = new Date();
//         d.setDate(d.getDate() - i);
//         days.push(d.toISOString().slice(0, 10));
//     }
//     return days;
// }

// // router.get('/metrics', verifyToken, async (req, res) => {
// router.get('/metrics', verifyToken, async (req, res) => {
//     try {
//         // Total books in the system
//         const totalBooks = await Book.countDocuments();

//         // Books currently issued (status: "Issued")
//         const purchasedBooks = await paymenthistory.countDocuments();

//         // Books returned (status: "Available" and not currently issued)
//         const totalStock = await Book.countDocuments({ status: "Available", issuedTo: null });

//         const stockOut = await Book.countDocuments({ quantity: { $eq: 0 } });




//         // Borrowed books (books issued to someone)
//         res.json({
//             stats: {
//                 totalBooks,
//                 purchasedBooks,
//                 totalStock,
//                 stockOut
//             }
//         });

//     } catch (error) {
//         console.error("Dashboard metrics error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const Book = require('../Models/Book');
// const User = require('../Models/User');                
// const paymenthistory = require('../Models/PaymentHistory');
// const BookHistory = require('../Models/BookHistory');    
// const verifyToken = require('../Middleware/Auth');

// router.get('/metrics', verifyToken, async (req, res) => {
//     try {
//         // Total books in the system
//         const totalBooks = await Book.countDocuments();

//         // Books currently issued / payments made
//         const purchasedBooks = await paymenthistory.countDocuments();

//         // Available stock
//         const totalStock = await Book.countDocuments({ status: "Available", issuedTo: null });

//         // Out of stock
//         const stockOut = await Book.countDocuments({ quantity: { $eq: 0 } });

//         //  Total registered users (excluding admins, adjust if you want admins counted too)
//         const totalUsers = await User.countDocuments({ role: 'user' });

//         //  Overdue books: endDate passed and status not "Returned"
//         const overdueBooks = await BookHistory.countDocuments({
//             endDate: { $lt: new Date() },
//             status: { $ne: "Returned" },
//         });

//         //  Recent users (for notif/list use, latest 5)
//         const recentUsers = await User.find({ role: 'user' })
//             .sort({ createdAt: -1 })
//             .limit(5)
//             .select('userId name email');

//         //  Recent books
//         const recentBooks = await Book.find()
//             .sort({ createdAt: -1 })
//             .limit(5);

//         res.json({
//             stats: {
//                 totalBooks,
//                 purchasedBooks,
//                 totalStock,
//                 stockOut,
//                 totalUsers,
//                 overdueBooks,
//             },
//             recentBooks,
//             recentUsers,
//         });

//     } catch (error) {
//         // console.error("Dashboard metrics error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;




















const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const User = require('../Models/User');
const paymenthistory = require('../Models/PaymentHistory');
const verifyToken = require('../Middleware/Auth');

router.get('/metrics', verifyToken, async (req, res) => {
    try {
        const now = new Date();

        // Total books (titles) in the system
        const totalBooks = await Book.countDocuments();

        // Active rentals: started, not yet past endDate, not returned
        const purchasedBooks = await paymenthistory.countDocuments({
            endDate: { $gte: now },
            status: { $ne: "Returned" },
        });

        // Available titles in stock
        const totalStock = await Book.countDocuments({ status: "Available", issuedTo: null });

        // Out-of-stock titles (fixed: stock, not quantity)
        const stockOut = await Book.countDocuments({ stock: { $eq: 0 } });

        // Total registered users (role: 'user' excludes admins)
        const totalUsers = await User.countDocuments({ role: 'user' });

        // Overdue: endDate has passed and not marked returned
        const overdueBooks = await paymenthistory.countDocuments({
            endDate: { $lt: now },
            status: { $ne: "Returned" },
        });

        // Recent users
        const recentUsers = await User.find({ role: 'user' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('userId name email');

        // Recent books
        const recentBooks = await Book.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalBooks,
                purchasedBooks,
                totalStock,
                stockOut,
                totalUsers,
                overdueBooks,
            },
            recentBooks,
            recentUsers,
        });

    } catch (error) {
        console.error("Dashboard metrics error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
