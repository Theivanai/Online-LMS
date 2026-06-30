const mongoose = require('mongoose');


const BookHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userImage: String,
    userName: { type: String },
    userEmail: { type: String },
    bookId: { type: String },
    bookTitle: String,
    startDate: Date,
    endDate: Date,
    status: String,
    amountPaid: Number,
}, { timestamps: true });

module.exports = mongoose.model("BookHistory", BookHistorySchema);