import UserDataModel from '../models/UserDataModel.js';
import bcrypt from 'bcrypt';
export const getUserData = async (req, res) => { 
    try {
        const userId = req.params.id.toString(); // Convert userId to a string
        console.log(typeof userId);
        
        const userData = await UserDataModel.findById(userId);
        res.send(userData);
                
        // res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const PostUserData = async (req, res) => {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        phone : req.body.phone,
    } 
    
    const findEmail = await UserDataModel.findOne({ email: userData.email });
    const findPhone = await UserDataModel.findOne({ phone: userData.phone });

    if (findPhone) {
        return res.status(400).json({ message: "Phone already exists" });
    }


    if (findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUserData = new UserDataModel(userData);

    try {
        await newUserData.save();
        res.status(201).json(newUserData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const UpdateUserData = async (req, res) => {
    const userId = req.params.id.toString();  // Assuming the user ID is passed as a parameter
    const {firstName} = req.body;
    const {lastName} = req.body;
    const {phone} = req.body;
    const {email} = req.body;
    const {age} = req.body;
    const {gender} = req.body;

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone : phone,
        age: age,
        gender : gender,
    };

    let requestData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        age : userData.age,
        gender : userData.gender,
        phone : userData.phone,
      };
    
      if (req.file) {
        const profilePic = req.file.filename;
        requestData.profilePic = profilePic;
      }

    const options = { new: true };

    const findEmail = await UserDataModel.findOne({ email: userData.email });

    const findPhone = await UserDataModel.findOne({ phone: userData.phone });

    if (findPhone) {
        return res.status(400).json({ message: "Phone already exists" });
    }


    if (findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    try {
        const updatedUserData = await UserDataModel.findByIdAndUpdate(userId, requestData, options);
        res.status(200).json(updatedUserData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const DeleteUserData = async (req, res) => {
    const userId = req.params.userId; // Assuming the user ID is passed as a parameter

    try {
        await UserDataModel.findByIdAndRemove(userId);
        res.status(200).json({ message: "User deleted successfully." });
    }catch (error) {  
        res.status(404).json({ message: error.message });
    } 

}