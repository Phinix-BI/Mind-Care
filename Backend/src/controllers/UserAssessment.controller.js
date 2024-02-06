// Desc: UserAssessment controller to handle the user response and save it to the database
import UserResponse from  "../Models/UserResponseModel.js"
import Question from "../models/QuestionModel.js"
import stringSimilarity from 'string-similarity';

//GETreqrs
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
export const saveUserResponse = async (req, res) => {
    const { response } = req.body;
    const { userRes } = req.body;
    console.log("userText : ", userRes);
    const { QuestionName } = req.body;
    console.log("questionName : ", QuestionName);

    try {
        const similarQuestion = await Question.findOne(
            { "question": { $elemMatch: { "QuestionText": QuestionName } } },
            { "question.$": 1 }
        );

        console.log("similarQuestion : ", similarQuestion.question[0].options);

        const backendOptions = similarQuestion.question[0].options.map((option) => option);

        const matchResult = findClosestMatch(userRes, backendOptions);

        res.status(201).json(matchResult);

        console.log("Data saved successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function findClosestMatch(userText, backendOptions) {
    const ratings = backendOptions.map((option) =>
        stringSimilarity.compareTwoStrings(userText, option)
    );
    const bestMatchIndex = ratings.indexOf(Math.max(...ratings));
    return { bestMatchIndex: bestMatchIndex + 1, match: true }; // Adjust to your specific numbering scheme
}


//PATCH
export const updateUserResponse = async (req, res) => {

}

// connectDB()
// saveUserResponse()