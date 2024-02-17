import React, { useEffect,useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";

const TypingBox = ({saveAiMessage,saveUserMessage , socket}) => {

  const [message, setMessage] = useState('');


  const handelSend = async() => {
    socket.emit('userMessage', message);
    saveUserMessage(message);
  }

  useEffect(() => { 
    socket.on('aiResponse', (message) => {
      console.log(message);
      saveAiMessage(message);

    })
  },[])

  useEffect(() => {
    return () => {
      socket.off('aiResponse');
    }
  },[])

  return (
    
    <div className=''>
    
        <div className='w-full bg-white max-w-screen-xl flex border-2 my-5 p-2 rounded-lg fixed bottom-0'>
            <input type="text" className='focus:ring-0 w-11/12 rounded-xl border-none' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className='flex justify-space'>
              <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg'><IoMdMic /></i>
                <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg' onClick={handelSend}><IoSendSharp /></i>
            </div>
        </div>
    </div>
  )
}

export default TypingBox