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
    const {fullName} = req.body;
    const {role} = req.body;
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
    const {email} = req.body;
    const {password} = req.body;

 
    // console.log(role);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const userData = {
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        email: email,
        role: role,
    } 
    console.log(userData);


    try {
    const findEmail = await UserDataModel.findOne({ email: userData.email });
    // const findPhone = await UserDataModel.findOne({ phone: userData.phone });

    // if (findPhone) {
    //     return res.status(400).json({ message: "Phone already exists" });
    // }


    if (findEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUserData = new UserDataModel(userData);
    
    await newUserData.save();
        res.status(201).json({message: "Profile Created Succesfully", newUserData});
    } catch (error) {
        res.status(409).json({ message: error.message + "Error in creating profile" });
    }
}

export const UpdateUserData = async (req, res) => {
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id;
    
        const {firstName,lastName, email, age, gender,phone,address,about,specialization,reqStatus } = req.body;
        
        // const firstName = fullName.split(" ")[0];
        // const lastName = fullName.split(" ")[1];
        const userData = {
            firstName,
            lastName,
            email,
            age,
            phone : phone || null,
            gender,
            about,
            address,
            reqStatus,
            specialization
        };

        console.log("req:  " ,reqStatus);

        
    
        const findUser = await UserDataModel.findById(userId);
    
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
  
        const requestData = { ...userData };
    
        if (req.file) {
            requestData.profilePic = req.file.filename;
        }
    
        const options = { new: true };


        // const prevEmail = findUser.email;
        // const prevPhone = findUser.phone;


        // if (email != prevEmail) {

        //     const existingEmail = await UserDataModel.findOne({ email }); 
    
        //     if (existingEmail) {
        //         return res.status(400).json({ message: "Email already exists" });
        //     }
        // }else if(phone != prevPhone){
        //     const existingPhone = await UserDataModel.findOne({ phone });
    
        //     if (existingPhone) {
        //         return res.status(400).json({ message: "Phone already exists" });
        //     }
        // }
    
        try {
            const updatedUserData = await UserDataModel.findByIdAndUpdate(
                userId,
                requestData,
                options
            );
            res.status(200).json(updatedUserData);
        } catch (error) {
            console.log(error);
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

export const getDoctorsData = async (req, res) => {
    try {
        const doctorsData = await UserDataModel.find({role: "Doctor"});
        res.status(200).json(doctorsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const saveDrAppointmentId = async (req, res) => {

    const {patientId, drId} = req.body;
   

    const userId = jwt.verify(patientId, process.env.TOKEN_SECRET).id;

    console.log("userId: ",userId);

    if(!userId || !drId) { res.status(400).json("Req body data not found") };

    try {
        const response = await UserDataModel.findOneAndUpdate(
           // search criteria
            {_id : userId},

            //update
            {$push:{ drAppointmentId : drId.toString() }},

            {returnDocument:"after"}
        )

        console.log("Dr id addedd: ",response);
        res.status(200).json({"Dr id addedd":response})

    } catch (error) {

        console.log(error)

    }
}


export const deleteDrAppointmentId = async (req, res) => {

    const {patientId, drId} = req.query;

    const userId = jwt.verify(patientId, process.env.TOKEN_SECRET).id;

    if(!userId || !drId) { res.status(400).json("Req body data not found") };

    try {
         
        const response = await UserDataModel.findOneAndUpdate(
            // search criteria
             {_id : userId , drAppointmentId : drId},

             //update
             {$pull:{ drAppointmentId : drId }},

             {returnDocument:"after"}
  
         )

        console.log("Dr id deleted: ",response);
        res.status(200).json({"Dr id addedd":response})

    } catch (error) {

        console.log(error)

    }
}

