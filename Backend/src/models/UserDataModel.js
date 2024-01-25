import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phone: {
        type: Number,
    },
    profilePic: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'Patient'
    },
    token: {
        type: String,
    },
    otp: {
        type: Number,
    },
    otpExpire: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

export default User;