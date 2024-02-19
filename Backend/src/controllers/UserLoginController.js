import UserDataModel from '../models/UserDataModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserDataModel.js';
import cookie from 'cookie';
import dotenv from 'dotenv/config';
import nodemailer from 'nodemailer';    
import otpGenerator from 'otp-generator';
export const PostUserLogin = async (req, res) => {

    const {email} = req.body;
    const {password} = req.body;
 
    // console.log(process.env.TOKEN_SECRET);

    try{
        const findUser = await UserDataModel.findOne({ email: email });
        if (!findUser) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const validPassword = await bcrypt.compare(password, findUser.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

      
            const token = jwt.sign({ id: findUser._id },process.env.TOKEN_SECRET,{ expiresIn: '168h' });
           
            findUser.token = token;
            await findUser.save();

               // Set the token as a cookie
            //    res.cookie('auth-token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).send({message: "Login successful", token: token});
        
         console.log("Login successful");
        // res.status(200).json(findUser);
    }catch(error){  
        res.status(404).json({ message: error.message });
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email required' });
        }

        const findUser = await UserDataModel.findOne({ email: email });

        if (!findUser) {
            return res.status(403).json({ message: 'Email is not registered' });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 10);

        const response = await UserDataModel.updateOne({ email: email }, { otp: otp, otpExpire: otpExpire });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP for password reset',
            html: `<h3>OTP for password reset is </h3><h1 style="font-weight:bold">${otp}</h1>`
        };

        const result = await transporter.sendMail(mailOptions);

        if (result) {
            return res.status(200).json({ message: `OTP sent successfully` });
        } else {
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {
        if (!otp) {
            return res.status(400).json({ message: 'OTP required' });
        }

        const findUser = await UserDataModel.findOne({ otp: otp });

        if (!findUser) {
            return res.status(403).json({ message: 'Invalid OTP' });
        }

        if (findUser.otpExpire < new Date()) {
            return res.status(403).json({ message: 'OTP expired' });
        }

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const resetPassword = async (req, res) => {
    const { otp, password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password does not match' });
    }

    try {
        const findUser = await UserDataModel.findOne({ otp: otp });

        if (!findUser) {
            return res.status(403).json({ message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (findUser.otpExpire < new Date()) {
            return res.status(403).json({ message: 'OTP expired' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const response = await UserDataModel.updateOne(
            { email: findUser.email },
            { password: hashedPassword, otp: null, otpExpire: null }
        );

        console.log(response + ' response');
        if (response.nModified > 0) {
            return res.status(500).json({ message: 'Failed to reset password' });
        } else {
            return res.status(200).json({ message: 'Password reset successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

