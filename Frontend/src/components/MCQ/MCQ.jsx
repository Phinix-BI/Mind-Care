import React, { useEffect, useState } from 'react'
import Styles from './MCQ.module.css'
import  Diagnose_Question from '../dummydata';
// import questions from '../../questions'; 
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { GiTireIronCross } from "react-icons/gi";
import Testing from '../Testing/Testing';
// import { set } from 'mongoose';
import axios from 'axios';
// import Question from '../../../../Backend/src/models/QuestionModel';
const MCQ = () => {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [matching, setMatching] = useState(false);
    const[matchIndex, setMatchIndex] = useState(-1);
    const[assessment,setAssessment] = useState([]);
    const [clickedOption, setClickedOption] = useState(null);

    const [showPreview, setShowPreview] = useState(false);

    //CALL POST API TO SAVE USER RESPONSE
    const handleNext = () => {
        if (currentQuestion < assessment.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setClickedOption(null);
        }
        
      };
    
    //CALL PATCH API TO UPDATE USER RESPONSE
    const handlePrev = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
          setClickedOption(null);
        }
        
      };

    //CALL POST API TO SAVE LAST USER RESPONSE AND SEND THE FULL RESPONSE FROM DATABASE TO THE BACKEND
    const handleSubmit = () => {
        console.log('Submit button clicked');
        setShowPreview(true);
      }
      const handlePreview = () => {
        setShowPreview(false);
      }
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/admin/assessment/get");
            if (response.data.data[0]) {
              setAssessment(response.data.data[0].slice());
              console.log(response.data.data[0]);
            } else {
              console.error("No assessment data found.");
            }
          } catch (error) {
            console.error("Error fetching assessment data:", error);
          }
        };
    
        fetchData();
      },[])
      
      
      
      if (assessment.length === 0) {
        return <h1>Loading.......</h1>;
      }

      const currentQuestionData = assessment[currentQuestion];


      // voice part

      const enableVoiceRecognition = async() => {
       
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US'; //lang
          
          let isRecognitionProcessing = false;//used as a flag
          
          recognition.onresult =  async function (event) {
            // Set the flag to true when processing a result
            isRecognitionProcessing = true;
            
            const last = event.results.length - 1;
            const spokenText = event.results[last][0].transcript.trim().toLowerCase();

            console.log(spokenText);
      
            const response = await axios.post("http://localhost:3000/user/userAssessment/save",
            {userRes : spokenText, QuestionName:currentQuestionData.QuestionText})
           
            console.log(response.data);

            setMatchIndex(response.data.bestMatchIndex);

            let matched = response.data.match;
            console.log(matched);
            
            if (matched) {
              // displayFeedback(feedbackContainer, 'Voice input recognized successfully.');
              recognition.stop()
              isRecognitionProcessing = true;
            } else{
              // displayFeedback(feedbackContainer, 'Sorry, voice input not matched. Please try again.');
              isRecognitionProcessing = false;
            }
          
          };
          
          recognition.onend = async function () {
            // Set the flag to false when recognition ends
             
            // Restart recognition only if not currently processing a result
            // if (!isRecognitionProcessing) {
            //   recognition.start();
            // }
          };
          
          recognition.start();
      
        
      }
        else {
          console.error('Speech recognition not supported in this browser.');
        }
      
      }
      enableVoiceRecognition();
      
      // const handleMatching = (e) => {
      
      // }

    
  return (
    <div  className="bg-white flex justify-center h-screen">
        <div className="absolute isolate px-6 pt-14 lg:px-8 max-w-screen-xl">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
         
        
        <div className='flex mx-auto w-12 my-4'>
          <img src="images\logo.png"></img>
        </div>
        
        <div className="flex justify-center p-2">{currentQuestion+1} of {assessment.length}
          <div className={Styles.progressBar}>
              <div style={{ width: `${(currentQuestion / 10) * 100}%` }} className={Styles.progressFill}></div>
            </div>
        </div>

        <div className="bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 mx-auto w-3/12">
          <div className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500" style={{width:`${(currentQuestion / (assessment.length - 1)) * 100}%`}}></div>
        </div>
       
        <div>
          <div key={currentQuestion} className={Styles.questions}>
            <div className='w-screen max-w-6xl p-4 rounded-lg'><h1>{currentQuestionData.QuestionText}</h1></div>
            

            {currentQuestionData.options.map((option, optionIndex) => (
      <div key={optionIndex} className={Styles.options}>
      <button
                type="button"
                className={`text-purple-700 hover:text-black border focus:ring-4 focus:outline-none focus:ring-purple-300 ${(matchIndex - 1) === optionIndex ? 'border-purple-700 ' : ''} ${(clickedOption === optionIndex) ? 'border-purple-700 ' : ''} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                onClick={() => setClickedOption(optionIndex)}
              >
          <label>{`${String.fromCharCode(97 + optionIndex)}. ${option}`}</label>
        </button>
      </div>
    ))}
          </div>
        </div>

            <div className={Styles.button}>
                {currentQuestion > 0 ? (
                    <button className={Styles.Prevbtn} onClick={handlePrev}><i><GrFormPreviousLink /></i>  Prev</button>
                ) : null}
                {currentQuestion === assessment.length - 1 ? 
                    <button className={Styles.Nxtbtn} onClick={handleSubmit}>Submit <i><GrFormNextLink /></i></button> 
                    :
                    <button className={Styles.Nxtbtn} onClick={handleNext}>Next <i><GrFormNextLink /></i></button>
                }
            </div>
            {showPreview && (
        <div className='m-5 flex justify-center'>
          
          <div className='flex'>
            <div onClick={handlePreview}><GiTireIronCross /></div>
          </div>
          <div className='flex'><Testing /></div>
          
        </div>
      )}
            
        </div>
        
        </div>

  )
              }

export default MCQ;

