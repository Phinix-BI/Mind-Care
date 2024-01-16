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

      
            const token = jwt.sign({ id: findUser._id },process.env.TOKEN_SECRET,{ expiresIn: '2h' });
           
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

    const {email} = req.body;

    if(email === ''){
        res.status(400).send('Email required');
    }

    try{
        const findUser = await UserDataModel.findOne({ email: email });

        if(!findUser){
            res.status(403).send('Email is not registered');    
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const otpExpier = new Date();
        otpExpier.setMinutes(otpExpier.getMinutes() + 1);

        const response = await UserDataModel.updateOne({email: email}, {otp: otp, otpExpire: otpExpier});

       
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
            
            res.status(200).send(`OTP sent successfully`);
       

    }catch(error){
        res.status(404).json({ message: error.message });
    }

}

export const resetPassword = async (req, res) => {
    
    const {otp, password , confirmPassword} = req.body;

    if(!otp || !password || !confirmPassword){
        res.status(400).send('All fields are required');
    }

    if(password !== confirmPassword){
        res.status(400).send('Password does not match');
    }

    try{
        const findUser = await UserDataModel.findOne({ otp: otp });

        if(!findUser){
            res.status(403).send('Invalid OTP');    
        }

        if(findUser.otpExpire < new Date()){
            res.status(403).send('OTP expired');    
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const response = await UserDataModel.updateOne({email: findUser.email}, {password: hashedPassword, otp: null, otpExpire: null});

        res.status(200).send(`Password reset successfully`);


    }catch(error){
        res.status(404).json({ message: error.message });
    }


    console.log("reset password");
}


