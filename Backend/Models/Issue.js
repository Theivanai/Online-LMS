const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    issueDate: { type: Date, default: Date.now },
    returnDate: Date,
    returned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);