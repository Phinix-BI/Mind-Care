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
        type: String,
    },
    profilePic: {
        type: String,
    },
    
    address: {
        type: String,
    },
    specialization: {
        type: String,
    },
    about: {
        type: String,
    },
    reqStatus: {
        type: Boolean,
        default: false
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
    drAppointmentId : [String]
});

const User = mongoose.model('User', userSchema);

export default User;