import UserDataModel from '../models/UserDataModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const getUserData = async (req, res) => { 
    try {

        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id.toString(); // Convert userId to a string
        
        
        const userData = await UserDataModel.findById(userId);
        res.send(userData);
                
        // res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const PostUserData = async (req, res) => {
    const {firstName} = req.body;
    const {lastName} = req.body;
    const {phone} = req.body;
    const {email} = req.body;
    const {password} = req.body;

 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const userData = {
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        email: email,
        phone : phone,
    } 
    console.log(userData);

    
  

    try {
    const findEmail = await UserDataModel.findOne({ email: userData.email });
    const findPhone = await UserDataModel.findOne({ phone: userData.phone });

    if (findPhone) {
        return res.status(400).json({ message: "Phone already exists" });
    }


    if (findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUserData = new UserDataModel(userData);
    
    await newUserData.save();
        res.status(201).json({message: "Profile Created Succesfully", newUserData});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const UpdateUserData = async (req, res) => {
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id;
    
        const { firstName, lastName, phone, email, age, gender } = req.body;
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            age,
            gender,
        };
    
        const findUser = await UserDataModel.findById(userId);
    
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const requestData = { ...userData };
    
        if (req.file) {
            requestData.profilePic = req.file.filename;
        }
    
        const options = { new: true };
        const prevEmail = findUser.email;
        const prevPhone = findUser.phone;


        if (email != prevEmail) {

            const existingEmail = await UserDataModel.findOne({ email }); 
    
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }else if(phone != prevPhone){
            const existingPhone = await UserDataModel.findOne({ phone });
    
            if (existingPhone) {
                return res.status(400).json({ message: "Phone already exists" });
            }
        }
    
        try {
            const updatedUserData = await UserDataModel.findByIdAndUpdate(
                userId,
                requestData,
                options
            );
            res.status(200).json(updatedUserData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};
  


export const DeleteUserData = async (req, res) => {
    const userId = req.params.userId; // Assuming the user ID is passed as a parameter

    try {
        await UserDataModel.findByIdAndRemove(userId);
        res.status(200).json({ message: "User deleted successfully." });
    }catch (error) {  
        res.status(404).json({ message: error.message });
    } 

}