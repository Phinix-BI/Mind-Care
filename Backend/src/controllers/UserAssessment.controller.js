// Desc: UserAssessment controller to handle the user response and save it to the database
import UserResponse from "../models/UserResponseModel.js"
import Question from "../models/QuestionModel.js"
import stringSimilarity from 'string-similarity';
import { TOTAL_QUESTIONS } from '../constants.js'
import jwt from 'jsonwebtoken';
//GETreqrs
export const getuserResponse = async (req, res) => {
    const {userToken} = req.query;

    const userId = jwt.verify(userToken, process.env.TOKEN_SECRET).id;

    try {
        const getSavedData = await UserResponse.findOne({ userId: userId });
        // console.log("Data get from DB:", getSavedData);
        res.json(getSavedData)
    }
    catch (error) {
        console.log("Error to get data", error);
        res.status(404).json({ message: error.message });
    }
}




//POST
export const saveUserResponse = async (req, res) => {
    try {

        const { token, userRes, QuestionName, finalSubmit } = req.body;
        
        const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;
        console.log("User response:", userId);

        if (!userId) {
            return res.status(400).json({ "msg": "UserId is required" });
        }

        if (!QuestionName || !userRes) {
            return res.status(400).json({ "msg": "Body data fields are empty" });
        }

        const similarQuestion = await Question.findOne(
            { "question": { $elemMatch: { "QuestionText": QuestionName } } },
            { "question.$": 1 }
        );

        if (!similarQuestion) {
            return res.status(404).json({ "msg": "Question not found" });
        }

        const backendOptions = similarQuestion.question[0].options.map((option) => option);
        const matchResult = findClosestMatch(userRes, backendOptions);

        const userSelectedOption = similarQuestion.question[0].options[matchResult.bestMatchIndex - 1];

        const assessment = { q: QuestionName, a: userSelectedOption };

        const existingUserResponse = await UserResponse.findOne({ userId });

        if (!existingUserResponse) {
            // console.log("User not found, creating new user");
            const newUserResponse = await UserResponse.insertMany([{ userId: userId }]);
            
            const updatedUserResponse = await UserResponse.updateMany({ userId }, {
                $push: {
                    AllAssessments: { assessments: assessment }
                }
            });

        console.log("New user response:", updatedUserResponse);

        return res.status(201).json({ "msg": "User created and first data pushed" });

        }

        const lastAssessment = existingUserResponse.AllAssessments.slice(-1)[0];

        if (lastAssessment.complete && lastAssessment.assessments.length >= TOTAL_QUESTIONS) {

            existingUserResponse.AllAssessments.push({ complete: false, assessments: [assessment] });

        } else {

            let flag = 1;

            //update the ans
            for (let ob of lastAssessment.assessments){
                    if(ob.q === assessment.q){
                        ob.a = assessment.a;
                        flag = 0;
                        break;
                    }
            }

            if(flag){
            lastAssessment.assessments.push(assessment);
            }

            if (lastAssessment.assessments.length >= TOTAL_QUESTIONS && finalSubmit) {
                lastAssessment.complete = true;
            }

        }

        await existingUserResponse.save();
        
        console.log("Data saved successfully", matchResult);
        res.status(200).json({ "msg": "Data saved successfully", matchResult });

    } catch (error) {
        console.error("Error while saving user response:", error);
        res.status(500).json({ "error": "Internal server error" });
    }
};

// Add this function to your existing controller file
export const updateCompleteStatus = async (req, res) => {
    try {
        const { token, finalSubmit } = req.body;

        if (!token) {
            return res.status(400).json({ "msg": "Token is required" });
        }

        const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;

        if (!userId) {
            return res.status(400).json({ "msg": "UserId is required" });
        }

        const existingUserResponse = await UserResponse.findOne({ userId });

        if (!existingUserResponse) {
            return res.status(404).json({ "msg": "User not found" });
        }

        const lastAssessment = existingUserResponse.AllAssessments.slice(-1)[0];

        if (lastAssessment.assessments.length >= TOTAL_QUESTIONS && finalSubmit) {
            lastAssessment.complete = true;
            await existingUserResponse.save();
            return res.status(200).json({ "msg": "Complete status updated successfully" });
        } else {
            return res.status(400).json({ "msg": "Unable to update complete status" });
        }
    } catch (error) {
        console.error("Error while updating complete status:", error);
        res.status(500).json({ "error": "Internal server error" });
    }
};


function findClosestMatch(userText, backendOptions) {
    const ratings = backendOptions.map((option) =>
        stringSimilarity.compareTwoStrings(userText, option)
    );
    const bestMatchIndex = ratings.indexOf(Math.max(...ratings));
    return { bestMatchIndex: bestMatchIndex + 1, match: true }; // Adjust to your specific numbering scheme
}


