
import UserResponse from "../models/UserResponseModel.js";
import { GoogleGenerativeAI , HarmCategory , HarmBlockThreshold } from "@google/generative-ai";
import jwt from "jsonwebtoken";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GOOGLE_AI_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const predefineText = "Analysis Request: Given a dataset containing a set of questions and corresponding answers, analyze the data and provide comprehensive advice. suggest some exercise that fresh my mind? And also, how can I improve my mental health? Please give the data in a well structured ."


//to send the analyzed data to user
export const getAiResponse = async (req, res) => {

    const {token} = req.params;

    const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;

    if(!userId){return res.status(400).json({"msg": "UserId reqired in url"})}

    console.log(userId)

     try{
         const getSavedData = await UserResponse.findOne({userId:userId});
         const lastIndex = getSavedData.AllAssessments.length-1;
         const lastAssessment = getSavedData.AllAssessments[lastIndex].assessments;

         const parts = [{text:`Data:${lastAssessment} ${predefineText}`}];
        
         const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
          });
        
          const response = result.response;
          
          res.status(200).json(response.text());

     }
     catch(error){
         console.log("Error to get analyzed data", error);
         res.status(404).json({ "message": error.message });
     }
     
 }

 //analyze the data and save in db
 export const saveAiResponse = async (req,res) => {
      
 } 