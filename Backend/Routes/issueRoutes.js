const router = require('express').Router();
const Book = require('../Models/Book');
const Issue = require('../Models/Issue');
const User = require('../Models/User')
const verifyTokenAndAdmin = require('../Middleware/Auth');
const verifyTokenAndUser = require('../Middleware/Auth');
const verifyToken = require('../Middleware/Auth')
const mongoose = require('mongoose');


// Issue a book
router.put('/issue/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.quantity <= 0) {
            return res.status(400).json({ message: 'Book is out of stock' });
        }

        const { issuedTo } = req.body;

        const user = await User.findOne({ email: issuedTo });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Decrease quantity
        book.quantity -= 1;

        // Update issuedTo field
        book.issuedTo = user._id;

        // Update status based on quantity
        book.status = book.quantity === 0 ? 'Out of Stock' : 'Available';
        
        await book.save();

        const issue = new Issue({
            userId: user._id,
            bookId: book._id,
            issueDate: new Date()
        });
        await issue.save();

        res.json({ message: 'Book issued', issue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


//for user borrowwing books
router.put('/user/issue/:id', verifyToken, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.status !== 'Available') {
            return res.status(400).json({ message: 'Book not available' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });


        // Mark the book as issued
        book.status = 'Issued';
        book.issuedTo = req.user.id; // Save user ID in the book
        await book.save();

        // Log the issue
        const issue = new Issue({
            userId: req.user.id,
            bookId: book._id,
            issueDate: new Date(),
            returnDate: null,
            returned: false
        });
        await issue.save();

        res.status(200).json({ message: 'Book issued successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});




// GET: All issued books for admin
router.get('/admin-issued', verifyTokenAndAdmin, async (req, res) => {
    try {
        const issues = await Issue.find({ returned: false })
            .populate('bookId', 'title')
            .populate('userId', 'name email')
            .sort({ issueDate: -1 });

        const result = issues.filter((issue) => issue.bookId)
            .map(issue => ({
                _id: issue.bookId._id,
                title: issue.bookId.title,
                user: issue.userId?.name,
                email: issue.userId?.email,
                issuedDate: issue.issueDate,
                returnDate: issue.returnDate,
                returned: issue.returned,
            }));

        res.status(200).json(result);
    } catch (err) {
        console.error('Admin fetch issued error:', err);
        res.status(500).json({ message: 'Error fetching issued books' });
    }
});



//Get: Issued books for logged-in-user
router.get('/user-issued', verifyTokenAndUser, async (req, res) => {
    try {
        const issues = await Issue.find({ userId: req.user.id }).populate('bookId', 'title').sort({ issuedDate: -1 });

        const result = issues.map(issue => ({
            _id: issue._id,
            bookId: issue.bookId?._id,
            title: issue.bookId?.title || 'Unknown',
            issuedDate: issue.issueDate,
            returnDate: issue.returnDate,
            returned: issue.returned
        }));

        res.status(200).json(result);
    } catch (err) {
        console.error('User fetch issued error:', err);
        res.status(500).json({ message: 'Error fetching user\'s issued books' });
    }
});



// Return a book
router.put('/return/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check for valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.status !== 'Issued') {
            return res.status(400).json({ message: 'Book is not currently issued' });
        }

        book.status = 'Available';
        book.issuedTo = null;
        await book.save();

        // Update issue record
        const issue = await Issue.findOne({ bookId: bookId, returned: false });
        if (!issue) return res.status(400).json({ message: 'No active issue found for this book' });

        issue.returned = true;
        issue.returnDate = new Date();
        await issue.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


//for user returning books
router.put('/user/return/:bookId', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.bookId;

        //validate bookId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid bookId' });
        }

        //Find book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        //check eligilibility
        if (book.status !== 'Issued') {
            return res.status(400).json({ message: 'Book is not currently issued' });
        }

        if (!book.issuedTo || !book.issuedTo.equals(req.user.id)) {
            return res.status(403).json({ message: 'This book was not isssued to you' });
        }

        //Mark book as returned
        book.status = 'Available';
        book.issuedTo = null;
        await book.save();

        //update issue record
        const issue = await Issue.findOneAndUpdate(
            { bookId, userId: req.user.id, returned: false },
            { returned: true, returnDate: new Date() },
            { new: true }
        );

        if (!issue) {
            return res.status(404).json({ message: 'Issue record not found' });
        }
        res.status(200).json({ message: 'Book returned!' });
    } catch (err) {
        console.err('Return error', err);
        res.status(500).json({ message: 'Server error during return' });
    }
});

module.exports = router;