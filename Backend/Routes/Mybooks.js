const express = require('express');
const router = express.Router();
const PaymentHistory = require('../Models/PaymentHistory');
const User = require('../Models/User');
const verifyToken = require('../Middleware/Auth');

// GET purchased books for a user (active books only)
// router.get('/my-books', verifyToken, async (req, res) => {
//   try {
//     // Get actual user document from DB
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Your custom userId (LIB001...)
//     const userId = user._id;

//     const today = new Date();

//     const purchases = await PaymentHistory.find({
//       userId,
//       startDate: { $lte: today },
//       endDate: { $gte: today }   // Only active / not expired books
//     });

//     return res.status(200).json(purchases);

//   } catch (error) {
//     console.error("Error fetching purchased books:", error);
//     return res.status(500).json({ message: "Failed to fetch purchases", error });
//   }
// });
router.get('/my-books', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the custom userId field, not the Mongo _id
    const userId = user.userId;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize so a book valid "today" doesn't get excluded

    const purchases = await PaymentHistory.find({
      userId,
      startDate: { $lte: today },
      endDate: { $gte: today }
    });

    return res.status(200).json(purchases);

  } catch (error) {
    console.error("Error fetching purchased books:", error);
    return res.status(500).json({ message: "Failed to fetch purchases", error });
  }
});

// GET count of purchased books
// router.get('/count', verifyToken, async (req, res) => {
//   try {
//     // Again fetch real user
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userId = user._id;

//     const count = await PaymentHistory.countDocuments({ userId });

//     return res.json({ purchasedBooks: count });

//   } catch (error) {
//     console.error("Error getting purchase count:", error);
//     return res.status(500).json({ message: "Failed to fetch count", error });
//   }
// });
router.get('/count', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.userId;

    const count = await PaymentHistory.countDocuments({ userId });

    return res.json({ purchasedBooks: count });

  } catch (error) {
    console.error("Error getting purchase count:", error);
    return res.status(500).json({ message: "Failed to fetch count", error });
  }
});
module.exports = router;
