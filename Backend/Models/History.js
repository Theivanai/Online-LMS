const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", HistorySchema);