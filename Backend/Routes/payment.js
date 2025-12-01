const path = require('path');
const fs = require('fs');
const express = require("express");
const router = express.Router();
const PaymentHistory = require("../Models/PaymentHistory");
const BookHistory = require("../Models/BookHistory");
const User = require("../Models/User");
const Book = require("../Models/Book");
const verifyToken = require("../Middleware/Auth");
require("dotenv").config();







// router.get("/book-status/:bookId", verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         const bookId = req.params.bookId;

//         const history = await PaymentHistory.findOne({
//             userId: user.userId,
//             bookId,
//             status: "Purchased"
//         });

//         if (history) {
//             return res.status(200).json({
//                 purchased: true,
//                 startDate: history.startDate,
//                 endDate: history.endDate
//             });
//         } else {
//             return res.status(200).json({ purchased: false });
//         }
//     } catch (err) {
//         console.error("Book status check error:", err.message);
//         res.status(500).json({ message: "Failed to check book status" });
//     }
// });




// router.post("/verify", verifyToken, async (req, res) => {
//     try {
//         const {
//             bookId,
//             duration,
//             place,
//             amountPaid,
//             startDate,
//             endDate
//         } = req.body;

//         // Validate required fields
//         if (!bookId || !duration || !place || !amountPaid || !startDate || !endDate) {
//             return res.status(400).json({ message: "Missing required payment fields" });
//         }

//         // Fetch user
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Fetch book
//         const book = await Book.findOne({ $or: [{ bookId }, { _id: bookId }] });
//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         if (!book.bookFile) {
//             return res.status(400).json({ message: "PDF not found for this book" });
//         }

//         //  Check if user already purchased this book
//         const existingPurchase = await PaymentHistory.findOne({
//             userId: user.userId,
//             bookId: book.bookId,
//             status: "Purchased"
//         }).sort({ endDate: -1 }); //get most recent


//         // check only against latest enddate
//         if (existingPurchase) {
//             const now = new Date();

//             if (existingPurchase.endDate > now) {
//                 //still valid,block re-purchase
//                 return res.status(400).json({
//                     message: 'You already purchased this book and your access is still active'
//                 });
//             }
//         }

//         // Save new purchase(fresh record for history)
//         const newHistory = new PaymentHistory({
//             userId: user.userId,
//             bookId: book.bookId,
//             userName: user.name,
//             userEmail: user.email,
//             bookimg: book.image,
//             bookTitle: book.title,
//             amountPaid,
//             place,
//             duration,
//             status: "Purchased",
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             isFake: true,
//             paymentId: "FAKE_PAYMENT_" + Date.now(),
//             orderId: "FAKE_ORDER_" + Date.now(),
//             pdfPath: book.bookFile
//         });

//         await newHistory.save();

//         res.status(200).json({ message: "Payment recorded" });
//     } catch (error) {
//         console.error("payment verify error:", error);
//         res.status(500).json({ message: "Failed to record payment", error: error.message });
//     }
// });


//reduce stock


router.get("/book-status/:bookId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const bookId = req.params.bookId;
        const now = new Date();

        const history = await PaymentHistory.findOne({
            userId: user.userId,
            bookId,
            status: "Purchased",
            endDate: { $gt: now } // Only return true if the rental is still active
        });

        if (history) {
            return res.status(200).json({
                purchased: true,
                startDate: history.startDate,
                endDate: history.endDate
            });
        } else {
            return res.status(200).json({ purchased: false });
        }
    } catch (err) {
        console.error("Book status check error:", err.message);
        res.status(500).json({ message: "Failed to check book status" });
    }
});


// router.post("/verify", verifyToken, async (req, res) => {
//     try {
//         const {
//             bookId,
//             duration,
//             place,
//             amountPaid,
//             startDate,
//             endDate
//         } = req.body;

//         // Validate required fields
//         if (!bookId || !duration || !place || !amountPaid || !startDate || !endDate) {
//             return res.status(400).json({ message: "Missing required payment fields" });
//         }

//         // Fetch user
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Fetch book
//         const book = await Book.findOne({ $or: [{ bookId }, { _id: bookId }] });
//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         if (!book.bookFile) {
//             return res.status(400).json({ message: "PDF not found for this book" });
//         }

//         // Check if user has an active purchase for this book
//         const now = new Date();
//         const activePurchase = await PaymentHistory.findOne({
//             userId: user.userId,
//             bookId: book.bookId,
//             status: "Purchased",
//             endDate: { $gt: now } // Only consider purchases that are still active
//         });

//         if (activePurchase) {
//             // User already has an active purchase for this book
//             return res.status(400).json({
//                 message: 'You already have an active purchase for this book'
//             });
//         }

//         // Save new purchase (fresh record for history)
//         const newHistory = new PaymentHistory({
//             userId: user.userId,
//             bookId: book.bookId,
//             userName: user.name,
//             userEmail: user.email,
//             bookimg: book.image,
//             bookTitle: book.title,
//             amountPaid,
//             place,
//             duration,
//             status: "Purchased",
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             isFake: true,
//             paymentId: "FAKE_PAYMENT_" + Date.now(),
//             orderId: "FAKE_ORDER_" + Date.now(),
//             pdfPath: book.bookFile
//         });

//         await newHistory.save();

//         res.status(200).json({ message: "Payment recorded" });
//     } catch (error) {
//         console.error("payment verify error:", error);
//         res.status(500).json({ message: "Failed to record payment", error: error.message });
//     }
// });




router.post("/verify", verifyToken, async (req, res) => {
    try {
        const { bookId, duration, place, amountPaid, startDate, endDate } = req.body;

        // Validate
        if (!bookId || !duration || !place || !amountPaid || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required payment fields" });
        }

        // Get user
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Get book
        const book = await Book.findOne({ bookId }); // safer than OR
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (!book.bookFile) {
            return res.status(400).json({ message: "PDF not found for this book" });
        }

        // Check if already purchased & still active
        const now = new Date();
        const activePurchase = await PaymentHistory.findOne({
            userId: user._id.toString(), // consistent
            bookId: book._id.toString(),
            status: "Purchased", // match schema
            endDate: { $gt: now }
        });

        if (activePurchase) {
            return res.status(400).json({
                message: "You already have an active purchase for this book"
            });
        }

        // Save new purchase
        const newHistory = new PaymentHistory({
            userId: user._id.toString(),
            bookId: book._id.toString(),
            userName: user.name,
            userEmail: user.email,
            bookimg: book.image,
            bookTitle: book.title,
            amountPaid,
            place,
            duration,
            status: "Purchased", // keep consistent
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            isFake: true,
            paymentId: "FAKE_PAYMENT_" + Date.now(),
            orderId: "FAKE_ORDER_" + Date.now(),
            pdfPath: book.bookFile
        });

        await newHistory.save();

        res.status(200).json({ message: "Payment recorded successfully" });

    } catch (error) {
        console.error("Payment verify error:", error.message);
        res.status(500).json({ message: "Failed to record payment", error: error.message });
    }
});


// reduce-stock route
// router.put("/reduce-stock/:id", async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) return res.status(404).json("Book not found");

//         if (book.stock > 0) {
//             book.stock -= 1;
//             if (book.stock === 0) {
//                 book.status = "Out of Stock"; // Auto mark
//             }
//             await book.save();
//             return res.status(200).json("Stock updated");
//         } else {
//             book.status = "Out of Stock";
//             await book.save();
//             return res.status(400).json("Book is already out of stock");
//         }
//     } catch (err) {
//         res.status(500).json("Error updating stock");
//     }
// });

router.put("/reduce-stock/:id", async (req, res) => {
    try {
        const book = await Book.findOne({ bookId: req.params.id });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Already out of stock
        if (book.stock === 0) {
            book.status = "Out of Stock";
            await book.save();
            return res.status(400).json({ message: "Book is already out of stock" });
        }

        // Reduce stock
        book.stock -= 1;

        // Auto mark as out of stock
        if (book.stock === 0) {
            book.status = "Out of Stock";
        }

        await book.save();

        return res.status(200).json({
            message: "Stock updated",
            updatedStock: book.stock,
            status: book.status
        });

    } catch (err) {
        return res.status(500).json({ message: "Error updating stock", error: err.message });
    }
});




//purchasedbooks
router.get('/pdf/:bookId', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json("User not found");

        const history = await PaymentHistory.findOne({
            userId: user.userId,
            bookId,
            status: { $in: ["Purchased", "Success"] }
        });

        if (!history) {
            return res.status(403).json("You haven't purchased this book");
        }

        const book = await Book.findOne({ bookId });
        if (!book || !book.bookFile) {
            return res.status(404).json("Book or PDF not found");
        }

        const pdfPath = path.join(__dirname, '..', 'uploads', 'pdfs', book.bookFile);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json("PDF file not found on server");
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline',
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'X-Content-Type-Options': 'nosniff'
        });

        res.sendFile(pdfPath);
    } catch (error) {
        console.error("PDF fetch error:", error);
        res.status(500).json("Internal Server Error");
    }
});


//payment summary
router.get('/user-summary', verifyToken, async (req, res) => {
    const payments = await PaymentHistory.find({ userId: req.user.userId });
    const totalAmountPaid = payments.reduce((acc, p) => acc + (p.amountPaid || 0), 0);
    res.json({ totalPayments: payments.length, totalAmountPaid });
});

module.exports = router;