const jwt = require('jsonwebtoken');


// Verify any logged-in user (admin or user)
const verifyToken = (req, res, next) => {
    let token = null;

    // Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Fallback: check token from query param (for iframe)
    if (!token && req.query.token) {
        token = req.query.token;
    }

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id, userId: decoded.userId }; //full decoded payload
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};


//Admin-only routes
const verifyTokenAndAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized as admin" });
        }

        // User is admin — proceed
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};




//Normal user-only routes
const verifyTokenAndUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json("Access Denied");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'user') return res.status(403).json("User access required");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json("Invalid Token");
    }
};



module.exports =
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUser;