const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();


connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", require("./Routes/adminRoutes"));

app.use("/api/auth", require("./Routes/authRoutes"));

app.use("/api/book-history", require("./Routes/bookHistory"));

app.use("/api/book", require("./routes/bookRoutes"));

app.use("/api/dashboard", require("./Routes/dashboard"));

app.use("/api/issue", require("./routes/issueRoutes"));

app.use("/api/mybooks", require("./Routes/mybooks"));

app.use("/api/payment", require("./Routes/payment"));

app.use("/api/user", require("./Routes/userRoutes"));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});