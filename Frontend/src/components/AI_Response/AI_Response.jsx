import React, { useEffect,useState } from 'react';
import Navbar from '../common/Navbar2.0/Navbar2.0';
import Loader from '../common/Loader/Loader';
import axios from 'axios';
import MarkdownRenderer from '../common/MarkdownRenderer/MarkdownRenderer';
const AI_Response = () => {

  const [aiResponse, setAiResponse] = useState('');
  const localUserId = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handelAIResponse = async() => {
      try{
        const response = await axios.get(`https://mind-care-backend.vercel.app/ai/assessment/${localUserId}`);
        setAiResponse(response.data);
        console.log(response.data);
        console.log(aiResponse);
        setLoading(false);
      }catch(err){
        console.log(err);
      }
      
    }
    handelAIResponse();
  },[]);
  
  return (
    <div className='w-full max-w-screen-2xl mx-auto'>
      <Navbar />
      <div className='flex gap-4 w-fit mx-auto text-3xl font-semibold p-2 shadow-lg'>
        
        {loading ?<><h1 className='p-4'>Analyzing response</h1> <div className='p-4'><Loader /></div></> :
        <h1 className='p-4'>Ai Therapist response</h1>
        }
      </div>
        
        <div className='p-4 mt-20'><MarkdownRenderer markdownContent={aiResponse}/></div>
      
    </div>
  );
};

export default AI_Response;
