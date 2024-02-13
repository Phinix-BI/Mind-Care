import React from 'react'
import { IoSendSharp } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
const TypingBox = () => {
  return (
    <div className=''>
    
        <div className='w-full flex border-2 my-5 p-2 rounded-lg'>
            <input type="text" className='w-11/12 p-2 rounded-xl border-none' placeholder='Type a message'/>
            <div className='flex justify-space'>
                <i className='my-auto text-xl m-3'><IoMdMic /></i>
                <i className='my-auto text-xl m-3'><IoSendSharp /></i>
            </div>
        </div>
    </div>
  )
}

export default TypingBox