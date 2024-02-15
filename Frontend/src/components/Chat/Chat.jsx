import React from 'react';
import MessageAI from '../MessageAI/MessageAI';
import MessageUser from '../MessageUser/MessageUser';
import TypingBox from '../TypingBox/TypingBox';
import Navbar from '../Navbar/Navbar'

const Chat = () => {
  return (
    <div className='h-100vh'> {/* Apply background color to the entire chat interface */}
      <Navbar />
      {/* Render the NavBar component */}
      <div className='max-w-screen-lg mx-auto'>
      
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
            <img src="images\casual-life-3d-female-doctor-at-desk.png" className='mx-auto w-lg'/>
        </div>
        {/* Messages */}
        <div className=''>
          <MessageAI />
          <MessageUser />
          <MessageAI />
          <MessageUser />
          <MessageAI /><MessageAI />
          <MessageUser />
          <MessageAI />
          <MessageUser />
          <MessageAI /><MessageAI />
          <MessageUser />
          <MessageAI />
          <MessageUser />
          <MessageAI />
        </div>
        <TypingBox />
      </div>
    </div>
  );
};

export default Chat;
