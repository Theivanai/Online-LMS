const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const upload = require('../Middleware/Uploads');
const verifyTokenAndAdmin = require('../Middleware/Auth');


//generating userId for Users
const generateUserId = async () => {
  const year = new Date().getFullYear();

  // Find latest userId for the current year
  const latestUser = await User.findOne({ userId: { $regex: `^LIB${year}` } })
    .sort({ userId: -1 }) // Sort in descending order
    .limit(1);

  let newIdNumber = 1;

  if (latestUser) {
    const lastId = latestUser.userId;
    const lastNumber = parseInt(lastId.slice(7)); // Slice after "LIB2025"
    newIdNumber = lastNumber + 1;
  }

  return `LIB${year}${String(newIdNumber).padStart(3, '0')}`;
};




// User registration route
router.post('/register', upload.single('profileimg'), async (req, res) => {
  try {
    const { name, email, password, phone, address, gender, role = 'user' } = req.body;

    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("Email already exists");

    // Hash password (no salt manually needed)
    const hash = await bcrypt.hash(password, 10);

    // Generate unique userId
    const userId = await generateUserId();

    // Handle profile image if uploaded
    const profileImage = req.file ? req.file.filename : null;

    // Create user
    const newUser = new User({
      userId,
      name,
      email,
      password: hash,
      phone,
      address,
      gender,
      role,
      profileImage,
    });

    await newUser.save();
    res.status(201).json("User registered successfully");

  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === 11000) {
      return res.status(400).json("Duplicate userId. Try again.");
    }
    res.status(500).json("Server error");
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // generate JWT with id (not _id!)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token, // send token to frontend
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


//get all users(Admin only)
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    // const users = await User.find().select("-password");
    const users = await User.find().sort({ userId: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//update user
router.put('/update/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, phone, address, gender, role } = req.body;

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.gender = gender;
    user.role = role;

    // Password update (optional)
    if (req.body.password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update profile image if uploaded
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE user
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account" });
  }
});


module.exports = router;