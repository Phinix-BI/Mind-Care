import mongoose, { get } from "mongoose";


const optionSchema = new mongoose.Schema({
    text: String,
    optionNo : Number,
   
});


const questionSchema = new mongoose.Schema({
    QuestionNo : {
        type : Number,
        required : true
    },
    QuestionText : {
        type: String,
        required: true
    },
    options : [optionSchema]
        
});

  
   //question model
   const Question = mongoose.model('Question', questionSchema)

   export default Question 

   //sample to store many question
   let Questions = [
    {   
        QuestionNo : 1,
        QuestionText: "How is your relation with your mind?",
        options: [
            { text: "Paris", optionNo: 0 },
            { text: "London", optionNo: 1 },
            { text: "Berlin", optionNo: 2 },
            { text: "Rome", optionNo: 3 }
        ] 
    },
    {
        QuestionNo : 2,
        QuestionText: "Are you feeling low by any chance?",
        options: [
            { text: "Paris", optionNo: 0 },
            { text: "London", optionNo: 1 },
            { text: "Berlin", optionNo: 2 },
            { text: "Rome", optionNo: 3 }
        ] 
    },
    {  
         QuestionNo : 3,
        QuestionText: "Are you happy ?",
        options: [
            { text: "Paris",optionNo: 0 },
            { text: "London",optionNo: 1 },
            { text: "Berlin",optionNo: 2 },
            { text: "Rome", optionNo: 3}
        ] 
    },
    {  
        QuestionNo : 4,
        QuestionText: "Hpw is your mental condition?",
        options: [
            { text: "Paris", optionNo: 0 },
            { text: "London", optionNo: 1 },
            { text: "Berlin", optionNo: 2 },
            { text: "Rome", optionNo: 3 }
        ] 
    }
]

// async function saveQuestions() {
//     try{
//         const savedQuestions = await Question.insertMany(Questions);
//         console.log("Questions saved successfully:", savedQuestions)
//     }
//     catch(err){
//         console.error("Error saving questions:", err);
//     }
// }

// async function getSavedQuestion() {
//     try{
//         const Questions =  await Question.find({QuestionNo : 1});
//         return  Questions;
//     }
//     catch(error){
//         console.error("Error fetching questions:", error);
//         return [];
//     }
// }

// mongoose.connect('mongodb://localhost:27017/TestAssessmentDB')
// .then(
//     async () => {
//         console.log("Connected to MongoDB");
//         //  saveQuestions();
//        console.log("Data got from database:",await getSavedQuestion())
//     }
// )
// .catch(
//     (error) => {
//         console.log("error to connect MongoDB", error);
//     }
// )

  // export const UserQnAModel = mongoose.model('UserQnAModel',userQnResSchema);
  //export const AppQNOptionModel = mongoose.model('AppQNOptionModel', AllQuestionOptionSchema)