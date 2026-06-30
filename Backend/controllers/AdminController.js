const AdminUser = require('../Models/AdminUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../Models/User')


exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email and password are required!" });
        }

        // Check if the email already exists
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists!" });
        }

        // Hash password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const adminUser = new AdminUser({ name, email, password });
        await adminUser.save();

        // Generate JWT for new admin
        const token = jwt.sign({ id: adminUser._id, 
            role: adminUser.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            token,
            user: {
                id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email
                // role: adminUser.role,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }

        const adminUser = await AdminUser.findOne({ email });
        // console.log(adminUser)
        if (!adminUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        // Check if password exists in the database
        if (!adminUser.password) {
            return res.status(400).json({
                success: false,
                message: "Invalid user account configuration!!!",
            });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        const token = jwt.sign(
            { id: adminUser._id, role: adminUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            token,
            mustResetPassword: adminUser.mustResetPassword || false,
            user: {
                id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error!",
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    console.log("Received:", { email, password, role });

    try {
        // Validate input
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }

        // Find user and explicitly select password
        const user = await Users.findOne({ email, role }).select('+password');
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or user",
            });
        }
        console.log(user)
        // Compare passwords using the model method
        // const isMatch = await user.comparePassword(password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role,userId:user.userId },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from user object before sending response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            token,
            mustResetPassword: user.mustResetPassword,
            user: userWithoutPassword
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error!"
        });
    }
};