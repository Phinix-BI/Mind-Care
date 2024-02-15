import React from 'react'
import { IoSendSharp } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
const TypingBox = () => {
  return (
    <div className=''>
    
        <div className='w-full bg-white max-w-screen-xl flex border-2 my-5 p-2 rounded-lg fixed bottom-0'>
            <input type="text" className='focus:ring-0 w-11/12 rounded-xl border-none' placeholder='Type a message'/>
            <div className='flex justify-space'>
              <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg'><IoMdMic /></i>
                <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg'><IoSendSharp /></i>
            </div>
        </div>
    </div>
  )
}

export default TypingBox