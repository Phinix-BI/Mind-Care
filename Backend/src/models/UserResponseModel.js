import mongoose from "mongoose";

const UserResponseSchema = mongoose.Schema({
    userId:{
        type: String,
        required : true
    },
    questionNo : {
        type: Number,
        required : true 
    },
    question:{
        type: String,
        required : true
    },
    userResponse:{
        type: String,
        required : true
    }
});

//model
const UserResponse = mongoose.model('UserResponse', UserResponseSchema);
export default UserResponse;

//steps ->
//asuming i got user response for a question
//storing it in array userResponse
//in every page i append user response for each page question
// and saving it in DB by the function saveUserRespnse()

// let Response = [
//     {
//         userId: "01A",
//         questionNo : 1,
//         question: "How is your relation with your mind?",
//         userResponse: "Ayeen"
//     }
// ]
// Response.push({
//     userId: "01A",
//     questionNo : 2,
//     question: "Are you feeling low by any chance?",
//     userResponse: "Ayeen"
// })
// console.log(userResponse) 




//post req(done)
//   const saveUserRespnse = async (req,res) => {
   
//     const {UserResponseData} = req.body

//     try{
//        const savedData = await UserResponse.insertMany(UserResponseData)
//         console.log("Data saved successfully", savedData)
//     } 
//     catch(error){
//         console.log("Error to save data", error)
//     }
// }

//get req
// const getuserResponse = async (req,res) => {
//     try{
//         const getSavedData = await UserResponse.find({});
//         console.log("Data get from DB:",getSavedData);
//     }
//     catch(error){
//         console.log("Error to get data", error)
//     }
// }


//(done)
// async function connectDB(){

//     mongoose.connect('mongodb://localhost:27017/TestAssessmentDB')
//     .then(() => {
//         console.log("DB connected successfully");
//         // saveUserRespnse();
//         getuserResponse()
//     })
//     .catch((error) => {
//         console.log("DB connection error", error);

//     })
// }

// connectDB()



  