const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const dotenv = require('dotenv');

dotenv.config();



const app = express();

app.use(cors()); //enable for frontend requests
app.use(express.json()); //parses incoming JSON requests

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/LibrarySystem').then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import routes
const bookRoutes = require('./Routes/bookRoutes');
app.use('/api/book', bookRoutes);

//userroutes
const userRoutes = require('./Routes/userRoutes');
app.use('/api/user', userRoutes);

//dashboard
const dashboard = require('./Routes/dashboard');
app.use('/api/dashboard', dashboard);

//issueRoutes
const issueRoutes = require('./Routes/issueRoutes');
app.use('/api/book', issueRoutes);

//adminRoutes
const adminRoutes = require('./Routes/AdminRoutes');
app.use('/api/admin', adminRoutes);

//userrouter
const userRouter = require('./Routes/userRouter');
app.use('/api/users', userRouter);

//bookhistory(admin panel)
const bookhistory = require('./Routes/BookHistory');
app.use("/api/book-history", bookhistory);

//payment
const payment = require("./Routes/payment");
app.use("/api/payment", payment);

//mybooks
const mybooks = require("./Routes/Mybooks");
app.use("/api/mybooks", mybooks);


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});