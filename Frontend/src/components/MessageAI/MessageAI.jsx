import React from 'react'

const MessageAI = ({message,AiTime}) => {
  return (
    <div className='flex w-full py-2 px-1'>
        {/* img */}
        <div className='w-10 my-auto mx-2 rounded-full overflow-hidden'>
            <img src="images\1.jpg" />
        </div>

        {/* Message */}
        <div className='bg-yellow-100 max-w-xl rounded-xl flex p-2'>
            <div className='flex'>
              <p className='p-2'>{message}</p>
              <p className='float bottom-5 text-xs text-gray-500'>{AiTime}</p>
            </div>
        </div>
    </div>
  )
}


export default MessageAI