import React, { useState } from 'react'
import Styles from './MCQ.module.css'
import  Diagnose_Question from '../dummydata';
// import questions from '../../questions'; 
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

const MCQ = () => {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [matching, setMatching] = useState(false);
    const[matchIndex, setMatchIndex] = useState(-1);

    const handleNext = () => {
        if (currentQuestion < Diagnose_Question.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      };
    
      const handlePrev = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        }
      };

      const handleSubmit = () => {
          console.log('Submit button clicked');
      }
      

      
      // const enableVoiceRecognition = async() => {
       
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

            const response = await axios.post("http://localhost:3000/api/user/userAssessment/save",{spokenText,currentQuestion})
           
            console.log(response.data);
            setMatchIndex(response.data.bestMatchIndex);
            let matched = response.data.match;
            
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
            if (!isRecognitionProcessing) {
              recognition.start();
            }
          };
          
          recognition.start();
  
        } 
        else {
          console.error('Speech recognition not supported in this browser.');
        }
      

      // enableVoiceRecognition();

      // const handleMatching = (e) => {

      // }

    const currentQuestionData = Diagnose_Question[currentQuestion];

    
  return (
    <div  className="bg-white flex justify-center h-screen">
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-screen-xl">
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

        <div className="flex justify-center p-2">{currentQuestion+1} of {Diagnose_Question.length}
          <div className={Styles.progressBar}>
              <div style={{ width: `${(currentQuestion / 10) * 100}%` }} className={Styles.progressFill}></div>
            </div>
        </div>

        <div className="bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 mx-auto w-3/12">
          <div className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500" style={{width:`${(currentQuestion / (Diagnose_Question.length - 1)) * 100}%`}}></div>
        </div>
       
        <div>
          <div key={currentQuestion} className={Styles.questions}>
            <div className='w-screen max-w-6xl p-4 rounded-lg'><h1>{currentQuestionData.question}</h1></div>
            

            {currentQuestionData.options.map((option, optionIndex) => (
              <div key={optionIndex} className={Styles.options}>
               
              {(matchIndex === optionIndex) ? (
                  <button type="button" className="text-purple-700 hover:text-black border border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active">
                    <label>{`${String.fromCharCode(97 + optionIndex)}. ${option}`}</label></button>
            ):( <button type="button" className="text-purple-700 hover:text-black border border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <label>{`${String.fromCharCode(97 + optionIndex)}. ${option}`}</label>
                </button>)}
               
              </div>
            ))}
          </div>
        </div>

            <div className={Styles.button}>
                {currentQuestion > 0 ? (
                    <button className={Styles.Prevbtn} onClick={handlePrev}><i><GrFormPreviousLink /></i>  Prev</button>
                ) : null}
                {currentQuestion === Diagnose_Question.length - 1 ? 
                    <button className={Styles.Nxtbtn} onClick={handleSubmit}>Submit <i><GrFormNextLink /></i></button> 
                    :
                    <button className={Styles.Nxtbtn} onClick={handleNext}>Next <i><GrFormNextLink /></i></button>
                }
            </div>
            

            
        </div>
        
        </div>

  )
              }

export default MCQ;