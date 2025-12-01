// const express = require('express');
// const router = express.Router();
// const PaymentHistory = require('../Models/PaymentHistory');
// const verifyToken = require('../Middleware/Auth');
// const User = require('../Models/User');


// // GET purchased books for a user
// // router.get('/my-books', verifyToken, async (req, res) => {
// //   try {

// //     const userId = req.user.userId;
// //     const today = new Date();

// //     const purchases = await PaymentHistory.find({
// //       userId,
// //       startDate: { $lte: today },
// //       endDate: { $gte: today }
// //     });

// //     res.status(200).json(purchases);
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to fetch purchases", error });
// //   }
// // });
// router.get('/my-books', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);  // FIX
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const userId = user.userId;  // FIX (your custom ID)

//     const today = new Date();

//     const purchases = await PaymentHistory.find({
//       userId,
//       startDate: { $lte: today },
//       endDate: { $gte: today }
//     });

//     res.status(200).json(purchases);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch purchases", error });
//   }
// });


// //book count
// router.get('/count', verifyToken, async (req, res) => {
//   // const count = await PaymentHistory.countDocuments({ userId: req.user.userId });
//   const user = await User.findById(req.user.id);
//   const count = await PaymentHistory.countDocuments({ userId: user.userId });
//   res.json({ purchasedBooks: count });
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const PaymentHistory = require('../Models/PaymentHistory');
const User = require('../Models/User');
const verifyToken = require('../Middleware/Auth');

// GET purchased books for a user (active books only)
router.get('/my-books', verifyToken, async (req, res) => {
  try {
    // Get actual user document from DB
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Your custom userId (LIB001...)
    const userId = user.userId;

    const today = new Date();

    const purchases = await PaymentHistory.find({
      userId,
      startDate: { $lte: today },
      endDate: { $gte: today }   // Only active / not expired books
    });

    return res.status(200).json(purchases);

  } catch (error) {
    console.error("Error fetching purchased books:", error);
    return res.status(500).json({ message: "Failed to fetch purchases", error });
  }
});

// GET count of purchased books
router.get('/count', verifyToken, async (req, res) => {
  try {
    // Again fetch real user
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
