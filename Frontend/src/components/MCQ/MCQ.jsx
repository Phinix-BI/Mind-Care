import React, { useState } from 'react'
import Styles from './MCQ.module.css'
// import questions from '../../questions'; 

const MCQ = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const handleNext = () => {
    // Assuming there are 10 questions
        if (currentQuestion < 10) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    let prev = "Previous"
    if(currentQuestion === 1) {
        prev = ""
    }

    const handlePrev = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    let next = "Next"
    if(currentQuestion === 10) {
        next = "Submit"
    }
  return (
    <div>
        <div>
            <div className={Styles.questions}>
            <h2><u>Question 1:</u></h2>
            <h1>What is the capital of France?</h1>
            </div>
            <div className={Styles.options}>
                <button>
                    <label>a. Checkbox Label hvwg gisyiw lsuyw0j lqwdb kdcpwunc.</label>
                </button>
            </div>

            <div className={Styles.options}>
                <button>
                    <label>b. Checkbox Label hvwg gisyiw lsuyw0j lqwdb kdcpwunc.</label>
                </button>
            </div>

            <div className={Styles.options}>
                <button>
                    <label>c. Checkbox Label hvwg gisyiw lsuyw0j lqwdb kdcpwunc.</label>
                </button>
            </div>

            <div className={Styles.options}>
                <button>
                    <label>d. Checkbox Label hvwg gisyiw lsuyw0j lqwdb kdcpwunc.</label>
                </button>
            </div>

            <div className={Styles.button}>
                <button className={Styles.Prevbtn}>{prev}</button>
                <button className={Styles.Nxtbtn}>{next}</button>
            </div>

            <div className={Styles.progress}>Progress: {currentQuestion} / 10
                <div className={Styles.progressBar}>
                    <div style={{ width: `${(currentQuestion / 10) * 100}%` }} className={Styles.progressFill}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MCQ