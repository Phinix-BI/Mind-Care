// Desc: UserAssessment controller to handle the user response and save it to the database
import UserResponse from "../models/UserResponseModel.js"
import Question from "../models/QuestionModel.js"
import stringSimilarity from 'string-similarity';
import { TOTAL_QUESTIONS } from '../constants.js'
import jwt from 'jsonwebtoken';
//GETreqrs
export const getuserResponse = async (req, res) => {
    const { userId } = req.body;
    try {
        const getSavedData = await UserResponse.findOne({ userId: userId });
        console.log("Data get from DB:", getSavedData);
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

        const { token, userRes, QuestionName } = req.body;
        
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

        const userSelectedOption = similarQuestion.question[0].options[matchResult.bestMatchIndex];

        const assessment = { q: QuestionName, a: userSelectedOption };

        const existingUserResponse = await UserResponse.findOne({ userId });

        if (!existingUserResponse) {
            // console.log("User not found, creating new user");
            const newUserResponse = await UserResponse.insertMany([{ userId: userId }]

                // AllAssessments: [{ complete: false, assessments: [assessment] }]
            );

            const updatedUserResponse = await UserResponse.updateMany({ userId }, {
                $push: {
                    AllAssessments: { assessments: assessment }
                }
            });
            console.log("New user response:", updatedUserResponse);
            // await newUserResponse.save();
            return res.status(201).json({ "msg": "User created and first data pushed" });
        }

        const lastAssessment = existingUserResponse.AllAssessments.slice(-1)[0];

        if (lastAssessment.complete || lastAssessment.assessments.length >= TOTAL_QUESTIONS) {
            existingUserResponse.AllAssessments.push({ complete: false, assessments: [assessment] });
        } else {
            lastAssessment.assessments.push(assessment);
            if (lastAssessment.assessments.length >= TOTAL_QUESTIONS) {
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

function findClosestMatch(userText, backendOptions) {
    const ratings = backendOptions.map((option) =>
        stringSimilarity.compareTwoStrings(userText, option)
    );
    const bestMatchIndex = ratings.indexOf(Math.max(...ratings));
    return { bestMatchIndex: bestMatchIndex + 1, match: true }; // Adjust to your specific numbering scheme
}


//PATCH
export const updateUserResponse = async (req, res) => {

    //extract data and validate
    // const { userId } = req.params
    // const { qNo, a } = req.body
    // if (!userId || !qNo || !a) {
    //     return res.status(400).json({ "message": "All field is required" })
    // }

    // try {
    //     await UserResponse.findOne({ userId: userId })
    //         .then(async (result) => {
    //             let storedData = result
    //             let index = storedData.AllAssessments.length - 1
    //             let lastAssessments = storedData.AllAssessments[index]
    //             let updateDocument = lastAssessments.assessments[qNo - 1]
    //             console.log(updateDocument)
    //             //updating
    //             updateDocument.a = a

    //             console.log(updateDocument)

    //             await storedData.save()
    //                 .then((result) => {
    //                     console.log("Data updated successfully:", result)
    //                     res.status(200).json({ "message": "Success" })
    //                 })
    //                 .catch((error) => {
    //                     console.log("error to update data:", error);
    //                     res.status(500).json({ "message": error })
    //                 })

    //         })
    //         .catch(error => {
    //             console.log("UserId not found", error)
    //             res.status(400).json({ "message": error })
    //         })
    // } catch (error) {
    //     console.log(" error", error)
    //     res.status(500).json({ "message": error })

    // }
}

// connectDB()
// saveUserResponse()