import UserDataModel from '../models/UserDataModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserDataModel.js';
import cookie from 'cookie';
import dotenv from 'dotenv/config';





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