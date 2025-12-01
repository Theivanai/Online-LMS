const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const paymenthistory = require('../Models/PaymentHistory');
const verifyToken = require('../Middleware/Auth');

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days;
}

// router.get('/metrics', verifyToken, async (req, res) => {
router.get('/metrics', verifyToken, async (req, res) => {
    try {
        // Total books in the system
        const totalBooks = await Book.countDocuments();

        // Books currently issued (status: "Issued")
        const purchasedBooks = await paymenthistory.countDocuments();

        // Books returned (status: "Available" and not currently issued)
        const totalStock = await Book.countDocuments({ status: "Available", issuedTo: null });

        const stockOut = await Book.countDocuments({ quantity: { $eq: 0 } });




        // Borrowed books (books issued to someone)
        res.json({
            stats: {
                totalBooks,
                purchasedBooks,
                totalStock,
                stockOut
            }
        });

    } catch (error) {
        console.error("Dashboard metrics error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
