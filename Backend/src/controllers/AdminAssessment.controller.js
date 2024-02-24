import { get } from 'mongoose'
import Question from '../models/QuestionModel.js';
import { defaultQuestions } from '../constants.js';
// import * as dotenv from "dotenv"



//get the questions
export const GetUserAssessment = async (req, res) => {
    try {
        let getSavedData = await Question.find({ customid: "mindcareAdmin" });

        const defaultData =  defaultQuestions;
          

       if (!getSavedData || getSavedData.length === 0) {
            const response = await Question.insertMany({ customid: "mindcareAdmin", question: defaultData });
            getSavedData = response; // Update the value after insertion
        }

        console.log("Data receive successfully");

        res.status(202).json({ data: getSavedData.map((data) => data.question)})

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Data not found" })
    }
}


//put new questions  -  when we want to increase assessment question number
export const PutUserAssessment = async (req, res) => {
    const response = req.body
    if (!response) { req.json({ message: "empty data sent" }).status(400) } //bad request}

    try {
        const checkData = await Question.countDocuments()
        if(checkData){
            // console.log(checkData)
            const saveData = await Question.updateOne(
                { customid: 'mindcareAdmin' },
                { $push: { question: response } }
            )
    
            console.log(saveData)
            // console.log(response)
        }
        else{
            // console.log("not exist", checkData)
            const saveData = await Question.insertMany(
                { customid: "mindcareAdmin", question: response } //send the json data in question array (model)  
            )
            console.log(saveData)
        }

        res.status(201).json({ msg: "Success" })
    } catch (error) {
        console.log(error)
    }

}


//update the questions
export const UpdateUserAssessment = async (req, res) => { }




export const DeleteUserAssessment = async (req, res) => {
    const { QuestionNo } = req.body;
    try {
      // Delete the question with the specified QuestionNo
      const afterDelete = await Question.updateMany(
        {},
        { $pull: { question: { QuestionNo: QuestionNo } } }
      );
  
      // Update the QuestionNo for the remaining questions
      const totalDocNo = await Question.countDocuments();
      for (let i = QuestionNo; i < totalDocNo; i++) {
        const response = await Question.updateMany(
          { "question.QuestionNo": i + 1 },
          { $set: { "question.$.QuestionNo": i } }
        );
        console.log(response);
      }
  
      console.log(afterDelete);
      res.status(201).json({ msg: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };