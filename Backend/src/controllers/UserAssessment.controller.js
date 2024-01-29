

import UserResponse from  "../Models/UserResponseModel.js"
import Question from "../Models/QuestionModel.js"
import stringSimilarity from 'string-similarity';

//GETreq
export const getuserResponse = async (req, res) => {
   const {userId} = req.body; 
    try{
        const getSavedData = await UserResponse.findOne({userId:userId});
        console.log("Data get from DB:",getSavedData);
        res.json(getSavedData)
    }
    catch(error){
        console.log("Error to get data", error);
        res.status(404).json({ message: error.message });
    }
    
}




//POST
export const saveUserResponse = async (req,res) => {
   
    const {response} = req.body;

   
    
    function findClosestMatch(userText, backendOptions) {
        const ratings = backendOptions.map(option => stringSimilarity.compareTwoStrings(userText, option));
        const bestMatchIndex = ratings.indexOf(Math.max(...ratings));
        return bestMatchIndex + 1; // Adjust to your specific numbering scheme
      }
    

    try{
       const savedData = await UserResponse.insertMany(response);
        console.log("Data saved successfully", savedData);
        res.status(201).json({msg :"Success"});
    } 
    catch(error){
        res.status(404).json({ message: error.message })
    }
    // res.json({msg:"OK"})
}

//PATCH
export const updateUserResponse = async (req, res) => {

}

// connectDB()
// saveUserResponse()