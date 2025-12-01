const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true },
  title: String,
  author: String,
  isbn: String,
  category: String,
  price: Number,
  stock: { type: Number, required: true, default: 1 },
  // quantity: Number,
  image: String,
  bookFile: String,
  status: { type: String, default: 'Available', enum: ['Available', 'Out of Stock'] },
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  publishedAt: {
    type: Date,
    default: Date.now,
  }

}, { timestamps: true });

// Pre-save hook to auto-generate bookId
BookSchema.pre('save', async function (next) {
  if (this.bookId) return next();

  const lastBook = await this.constructor.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastBook?.bookId) {
    const match = lastBook.bookId.match(/BOOK(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  this.bookId = `BOOK${String(nextNumber).padStart(3, '0')}`;
  next();
});


module.exports = mongoose.model('Book', BookSchema);