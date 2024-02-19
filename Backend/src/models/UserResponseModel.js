import mongoose from "mongoose";
const responseSchema = new mongoose.Schema({
    _id : String, //to omit default id
    q:{
        type:String,
        required:true
    },
    a:{
        type:String,
        required:true
    }
})
const nestedAsessmentSchema = mongoose.Schema({
    _id : String,
    complete : {
        type : Boolean,
        default : false
    },
    assessments : [responseSchema]
})

const SingleUserResponseSchema = mongoose.Schema({

    userId : {
        type:String,
        required : true
    },
    AllAssessments: [nestedAsessmentSchema]
},  { _id: false } );

//model
const UserResponse = mongoose.model('UserResponse', SingleUserResponseSchema);
export default UserResponse;









  