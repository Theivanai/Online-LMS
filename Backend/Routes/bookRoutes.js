const router = require('express').Router();
const Book = require('../Models/Book');
// const Issue = require('../Models/Issue');
const verifyTokenAndAdmin = require('../Middleware/Auth');
const upload = require('../Middleware/Uploads');

const mongoose = require('mongoose');

// GET all books
router.get('/all', async (req, res) => {
    try {
        const books = await Book.find()
            .populate('issuedTo', 'email name'); // only works if issuedTo is a reference

        const updated = await Promise.all(books.map(async (book) => {
            if (!book.publishedAt) {
                book.publishedAt = book.createdAt || new Date();
                await book.save(); // Persist the update
            }
            return book;
        }));

        res.json(updated);
    } catch (err) {
        console.error("Error fetching books:", err.message);
        res.status(500).json({ message: 'Error fetching books' });
    }
});


//books available at user panel
router.get('/available', async (req, res) => {
    const books = await Book.find({});
    res.json({ availableBooks: books.length });
});


// Add book by Admin (with multiple images)
router.post('/add', verifyTokenAndAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]),
    async (req, res) => {
        try {
            const { title, author, isbn, category, price, stock, publishedAt } = req.body;

            const image = req.files?.image?.[0]?.filename || null;
            const bookFile = req.files?.bookFile?.[0]?.filename || null;

            if (!image) {
                return res.status(400).json({ message: 'Image is required' });
            }

            if (!bookFile) {
                return res.status(400).json({ message: 'Book file (PDF) is required' });
            }

            const newBook = new Book({
                title,
                author,
                isbn,
                category,
                // quantity,
                price,
                stock,
                image,
                bookFile,
                status: 'Available',
                publishedAt: publishedAt ? new Date(publishedAt) : undefined
            });

            await newBook.save();

            res.status(201).json({ message: 'Book added successfully', book: newBook });

        } catch (error) {
            console.error('Error adding book:', error);

            if (error.code === 11000 && error.keyPattern && error.keyPattern.isbn) {
                return res.status(400).json({ message: 'ISBN already exists. Please use a unique ISBN.' });
            }

            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);




// Update book by ID
router.put('/update/:id', verifyTokenAndAdmin, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 }
]), async (req, res) => {
    try {
        const bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: "Invalid bookId." });
        }

        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        const updateFields = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn || "",
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock !== undefined ? req.body.stock : existingBook.stock,
            status: req.body.status || existingBook.status,
        };

        // Handle issuedTo logic
        if (updateFields.status === "Issued") {
            if (!req.body.issuedTo) {
                return res.status(400).json({ message: "issuedTo is required when book is Issued." });
            }
            if (!mongoose.Types.ObjectId.isValid(req.body.issuedTo)) {
                return res.status(400).json({ message: "Invalid user ID format for issuedTo." });
            }
            updateFields.issuedTo = req.body.issuedTo;
        } else {
            updateFields.issuedTo = null;
        }

        // Handle image
        if (req.files?.image?.[0]) {
            updateFields.image = req.files.image[0].filename;
        }

        // Handle bookFile
        if (req.files?.bookFile?.[0]) {
            updateFields.bookFile = req.files.bookFile[0].filename;
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, updateFields, { new: true });

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
        });

    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({
            message: "Error updating book",
            error: err.message,
        });
    }
});




// Bulk update books by IDs array
router.put('/bulk-update', verifyTokenAndAdmin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Only admin can bulk update books" });
    }

    const updates = req.body.updates;

    if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ message: "Invalid or empty updates array" });
    }

    try {
        const bulkOps = updates.map((update) => ({
            updateOne: {
                filter: { _id: update.id },
                update: { $set: update.fields }
            }
        }));

        const result = await Book.bulkWrite(bulkOps);
        res.status(200).json({
            message: "Bulk update completed",
            result
        });
    } catch (error) {
        res.status(500).json({
            message: "Bulk update failed",
            error: error.message
        });
    }
});





// Delete book by ID
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});





// Bulk delete books by IDs array
router.delete('/bulk-delete', verifyTokenAndAdmin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Only admin can bulk delete books" });
    }

    const ids = req.body.ids; // expect array of IDs

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid or empty IDs array" });
    }

    try {
        const result = await Book.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            message: "Bulk delete completed",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            message: "Bulk delete failed",
            error: error.message
        });
    }
});

module.exports = router;