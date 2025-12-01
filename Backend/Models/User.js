const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  profileImage: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  mustResetPassword: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String,
    default: null
  },
  tokenExpiry: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
