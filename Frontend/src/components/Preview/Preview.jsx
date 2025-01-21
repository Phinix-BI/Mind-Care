import React, { useState, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import axios from "axios";
// import { set } from "mongoose";
// import jwt from "jsonwebtoken";
const Preview = ({props,handelAIResponse}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [assessment, setAssessment] = useState([]);
  const[userChoosenOption, setUserChoosenOption] = useState([]);

  const userToken = localStorage.getItem('token');
  
  const nextSlide = () => {
    if (currentSlide < assessment.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  console.log(userToken);
 
  const handelFinalSubmission = async() => {  
    try{
      const response =  await axios.post(` https://mind-care-backend.vercel.app/user/userAssessment/submit`,{
        token :  userToken ,
        finalSubmit : true
      })

      handelAIResponse();
      
    }catch(error){
      console.error("Error fetching assessment data:", error);
    }
   
  };

  // const finalAIResponse = async() => {
  
  //   handelAIResponse();
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://mind-care-backend.vercel.app/admin/assessment/get"
        );
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
  }, []);

  useEffect(() => {
      const fetchUserAssessment = async() => { 
        try{
        const response =  await axios.get(` https://mind-care-backend.vercel.app/user/userAssessment/question`,
        {
          params: { userToken: userToken } // Include data as query parameters
        }
        
        )
        const lastIndex = response.data.AllAssessments.length-1;

        const lastAssessment = response.data.AllAssessments[lastIndex].assessments;
         // Extract options from the last assessment
        const userChosenOptions = lastAssessment.map(element => element.a);

        // Update the state once with the array of user chosen options
        setUserChoosenOption(userChosenOptions);
    
    }catch(error){
      console.error("Error fetching assessment data:", error);
    }}

    fetchUserAssessment();
  },[]);

  const currentSlideData = assessment[currentSlide];

  return (
    <div className="absolute left-40 bottom-40 bg-gray-100 shadow-lg p-6 mx-2 rounded-lg">
      <h1 className="text-center">Preview</h1>

      <div className="max-w-screen-md">
        <div className="overflow-hidden p-10">
          {currentSlideData ? (
            <div key={currentSlide} className="">
              <h1 className="font-medium text-3xl">
                {currentSlideData.QuestionText}
              </h1>

              <div className="text-lg font-normal m-5">
                {currentSlideData.options &&
                  currentSlideData.options.map((option, index) => (
                    <p  key={index} style = {{  color: userChoosenOption[currentSlide] === option ? "pink" : "" }} >
                      {`${String.fromCharCode(97 + index)}. ${option}`}
                    </p>
                  ))}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {currentSlide === assessment.length - 1 && (
            <button className="p-3 bg-blue-500 float-right text-white rounded-lg" onClick={ handelFinalSubmission}>
              Submit
            </button>
          )}
        </div>

        {(currentSlide === 0) ? (

        <i className="absolute right-0 top-1/2 p-2" onClick={nextSlide}>
          <GrNext />
        </i>


        ): (currentSlide === assessment.length - 1) ? (
          <i className="absolute left-0 top-1/2 p-2" onClick={prevSlide}>
          <GrPrevious />
        </i>
        ) : (
          <>
          <i className="absolute left-0 top-1/2 p-2" onClick={prevSlide}>
          <GrPrevious />
        </i>
        <i className="absolute right-0 top-1/2 p-2" onClick={nextSlide}>
          <GrNext />
        </i>
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
