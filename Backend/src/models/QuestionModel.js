import mongoose, { get } from "mongoose";


const questionSchema = new mongoose.Schema({
    QuestionNo : {
        type : Number,
        required : true
    },
    QuestionText : {
        type: String,
        required: true
    },
    options : []
        
});

const allQuestionSchema = new mongoose.Schema({
    customid :String,
    question : [questionSchema]
}, { _id: false })

  
//question model
delete mongoose.connection.models['Question']

 const Question = mongoose.model('Question', allQuestionSchema);

export default Question;


