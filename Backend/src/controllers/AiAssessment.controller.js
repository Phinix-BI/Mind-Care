
import UserResponse from "../models/UserResponseModel.js";

//to send the analyzed data to user
export const getAiResponse = async (req, res) => {
    const {userId} = req.params; 
    if(!userId){return res.status(400).json({"msg": "UserId reqired in url"})}
    console.log(userId)
     try{
         const getSavedData = await UserResponse.findOne({userId:userId});
         const lastIndex = getSavedData.AllAssessments.length-1;
         const lastAssessment = getSavedData.AllAssessments[lastIndex].assessments;
        //  console.log(lastAssessment);
        //  console.log("Data get from DB:",lastAssessment);
        //  res.json(lastAssessment)
        for (const ass of lastAssessment){
            console.log(ass)
        }

     }
     catch(error){
         console.log("Error to get analyzed data", error);
         res.status(404).json({ "message": error.message });
     }
     
 }

 //analyze the data and save in db
 export const saveAiResponse = async (req,res) => {
      
 } 