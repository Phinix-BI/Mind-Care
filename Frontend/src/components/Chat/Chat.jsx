import React from 'react';
import { useState,useEffect } from 'react';
import MessageAI from '../MessageAI/MessageAI';
import MessageUser from '../MessageUser/MessageUser';
import TypingBox from '../TypingBox/TypingBox';
import Navbar from '../common/Navbar2.0/Navbar2.0'
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [usermessage, setUsermessage] = useState([]); // [1]
  const [airesponse, setAiresponse] = useState([]); // [2]
  const [allMessages, setAllMessages] = useState([]); // Combine user and ai messages
  const [isTyping, setIsTyping] = useState(false);


  const introMessage1 = "Hello there! I'm your AI Mental Therapist, here to support you on your journey to mental well-being. Whether you need a friendly chat, someone to listen, or guidance on managing your thoughts and emotions, I'm here for you.";
  // const introMessage2 = "I'm here to provide support and assistance as you navigate through life's challenges. Whether you're seeking guidance, a listening ear, or simply a space to express yourself, I'm here to help. Please feel free to share whatever is on your mind, and together, we can work towards understanding and overcoming any obstacles you may be facing.";
  const introMessage3 = "How are you feeling right now? What's on your mind?"

  const currTime = new Date().toLocaleTimeString(); // [3]
  const timeInSplit = currTime.split(':')
  const timeWithOutSec = timeInSplit[0] + ':' + timeInSplit[1]; // [3]

  const AiTime = timeWithOutSec; // [3]
  const UserTime = timeWithOutSec; // [4]

  const aiFirstTime = AiTime; // [5]

  const handelAiResponse = (message) => {
   
    const aiResponseWithTime = { message, time:( new Date().toLocaleTimeString() ).split(':').slice(0, 2).join(':')};

    setAiresponse((prevAiResponse) => [...prevAiResponse, aiResponseWithTime]);
    setAllMessages((prevMessages) => [...prevMessages, { type: 'ai', ...aiResponseWithTime }]);

  }

  const handelUserMessage = (message) => {

    setUsermessage([...usermessage, message]);
    const userMessageWithTime = (new Date().toLocaleTimeString() ).split(':').slice(0, 2).join(':');
    setAllMessages((prevMessages) => [...prevMessages, { type: 'user', message, time: userMessageWithTime }]);
    
  }


  return (
    <div className='h-100vh'> {/* Apply background color to the entire chat interface */}
      <Navbar />
      {/* Render the NavBar component */}
      <div className='max-w-screen-xl mx-auto'>
      
        {/* Welcome Note */}
        <div className='text-center p-4'>
            <h1 className='text-3xl p-4 font-semibold'>Welcome to your AI Therapy Session</h1>
            <p className='text-lg font-medium text-gray-500 border-2 rounded-xl p-2 shadow-md'>I'm here to provide support and assistance as you navigate through life's 
            challenges. Whether you're seeking guidance, a listening ear, or simply a space to express yourself, 
            I'm here to help. Please feel free to share whatever is on your mind, and together, we can work
             towards understanding and overcoming any obstacles you may be facing.</p>
        </div>
        {/* 3D Avatar */}
        <div className='m-10 float-center'>
            <img src="images\casual-life-3d-female-doctor-at-desk.png" className='mx-auto w-lg drop-shadow-2xl'/>
        </div>
        {/* Messages */}
        <div className='mb-40'>
        <MessageAI message={introMessage1} AiTime={aiFirstTime} />
        {allMessages
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((msg, index) => {
            if (msg.type === 'user') {
              return <MessageUser key={index} message={msg.message} UserTime={msg.time} />;
            } else if (msg.type === 'ai') {
              return <MessageAI key={index} message={msg.message} AiTime={msg.time} />;
            }
            return null;
          })}
      </div>

        <TypingBox saveAiMessage={handelAiResponse} socket={socket} saveUserMessage={handelUserMessage}/>
      </div>
    </div>
  );
};

export default Chat;
