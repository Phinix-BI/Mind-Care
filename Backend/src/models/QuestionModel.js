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

// Check if the collection is empty

const result = Question.findOne({});
if (!result) {
    const defaultData = [{
        "_id": {
          "$oid": "65bba992db36653da223ea54"
        },
        "customid": "mindcareAdmin",
        "question": [
          {
            "QuestionNo": 1,
            "QuestionText": "How would you describe your overall mood most of the time?",
            "options": [
              "Very positive and optimistic",
              "Generally positive",
              "Neutral or mixed",
              "Frequently sad, anxious, or depressed"
            ],
            "_id": {
              "$oid": "65bba9dddb36653da223ea59"
            }
          },
          {
            "QuestionNo": 2,
            "QuestionText": "Do you find enjoyment in activities that used to bring you pleasure?",
            "options": [
              "Yes, consistently",
              "Sometimes, but less often",
              "Rarely or occasionally",
              "Rarely or never, even in activities I used to enjoy"
            ],
            "_id": {
              "$oid": "65bbad99a4fcd49f5a515687"
            }
          },
          {
            "QuestionNo": 3,
            "QuestionText": "How well are you sleeping on average?",
            "options": [
              "Well, consistently",
              "Occasionally disrupted but generally good",
              "Poorly or inconsistently",
              "Very poorly or experiencing significant sleep disturbances"
            ],
            "_id": {
              "$oid": "65bbada3a4fcd49f5a51568a"
            }
          },
          {
            "QuestionNo": 4,
            "QuestionText": "How would you rate your energy levels throughout the day?",
            "options": [
              "High and consistent",
              "Moderate and steady",
              "Low or fluctuating",
              "Very low or experiencing extreme fluctuations"
            ],
            "_id": {
              "$oid": "65bbadaca4fcd49f5a51568d"
            }
          },
          {
            "QuestionNo": 5,
            "QuestionText": "Are you experiencing changes in appetite or weight?",
            "options": [
              "No changes",
              "Some changes, but manageable",
              "Significant changes",
              "Drastic changes impacting daily functioning"
            ],
            "_id": {
              "$oid": "65cd0dab00d8be26b4a4da4b"
            }
          },
          {
            "QuestionNo": 6,
            "QuestionText": "Do you often find it challenging to concentrate or make decisions?",
            "options": [
              "Rarely or never",
              "Occasionally",
              "Frequently",
              "Constantly, affecting daily tasks and decision-making"
            ],
            "_id": {
              "$oid": "65cd0df800d8be26b4a4da4e"
            }
          },
          {
            "QuestionNo": 7,
            "QuestionText": "How would you describe your social interactions and relationships lately?",
            "options": [
              "Positive and fulfilling",
              "Generally positive with occasional challenges",
              "Strained or isolating",
              "Severely strained, impacting multiple relationships"
            ],
            "_id": {
              "$oid": "65cd0e5c00d8be26b4a4da51"
            }
          },
          {
            "QuestionNo": 8,
            "QuestionText": "Do you experience periods of intense worry or fear without an apparent cause?",
            "options": [
              "Rarely or never",
              "Occasionally",
              "Frequently",
              "Almost constantly, interfering with daily life"
            ],
            "_id": {
              "$oid": "65cd0ea400d8be26b4a4da54"
            }
          },
          {
            "QuestionNo": 9,
            "QuestionText": "Have you noticed any changes in your physical health, such as unexplained aches or pains?",
            "options": [
              "No changes",
              "Occasionally",
              "Frequently",
              "Persistent and severe physical health issues"
            ],
            "_id": {
              "$oid": "65cd0ef500d8be26b4a4da57"
            }
          },
          {
            "QuestionNo": 10,
            "QuestionText": "How do you cope with stress on a day-to-day basis?",
            "options": [
              "Effective coping strategies",
              "Some coping mechanisms",
              "Ineffective or maladaptive coping",
              "No effective coping mechanisms, leading to increased distress"
            ],
            "_id": {
              "$oid": "65cd0f4100d8be26b4a4da5a"
            }
          },
          {
            "QuestionNo": 11,
            "QuestionText": "Have you had thoughts of self-harm or suicide?",
            "options": [
              "No",
              "Rarely",
              "Occasionally",
              "Frequently or consistently"
            ],
            "_id": {
              "$oid": "65cd08be26b4a4da5af4100d"
            }
          },
          {
            "QuestionNo": 12,
            "QuestionText": "Do you experience racing thoughts or restlessness?",
            "options": [
              "Rarely or never",
              "Occasionally",
              "Frequently",
              "Almost constantly, affecting daily functioning"
            ],
            "_id": {
              "$oid": "65cd08be26b4aaf4100d4da5"
            }
          },
          {
            "QuestionNo": 13,
            "QuestionText": "How do you handle setbacks or challenges in your life?",
            "options": [
              "Resiliently and effectively",
              "With some difficulty",
              "Poorly or not at all",
              "Overwhelmed, leading to a significant decline in functioning"
            ],
            "_id": {
              "$oid": "65c6b4aaf4100d4dd08be2a5"
            }
          },
          {
            "QuestionNo": 14,
            "QuestionText": "Are there any specific traumas or major life changes you've experienced recently?",
            "options": [
              "No major traumas or changes",
              "Some moderate changes or challenges",
              "Significant traumas or life-altering events",
              "Severe traumas or multiple major life changes"
            ],
            "_id": {
              "$oid": "65c60d4dd08be2ab4aaf4105"
            }
          },
          {
            "QuestionNo": 15,
            "QuestionText": "How would you rate your overall stress level on a scale from 1 to 10, with 10 being the highest?",
            "options": [
              "1-3 (Low stress)",
              "4-6 (Moderate stress)",
              "7-8 (High stress)",
              "9-10 (Severe stress)"
            ],
            "_id": {
              "$oid": "65c60d4b4aaf4105dd08be2a"
            }
          }
        ],
        "__v": 0
      }];

    Question.insertMany(defaultData, (insertErr) => {
        if (insertErr) {
            console.error(insertErr);
        } else {
            console.log('Default data inserted successfully.');
        }
    });
}

export default Question;


