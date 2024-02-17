import React from 'react'

const MessageUser = ({message,UserTime}) => {
  return (
    <div className='flex w-full justify-end py-2 px-1'>
        
        {/* Message */}
        <div className='bg-green-300 max-w-xl rounded-xl flex flex-col p-2'>
            <div className='flex'>
              <p className='p-2'>{message}</p>
              <p className='relative -bottom-7 text-xs text-gray-500'>{UserTime}</p>
            </div>
        </div>

        {/* img */}
        <div className='w-10 my-auto mx-2 rounded-full overflow-hidden'>
            <img src="images\man1.avif" />
        </div>
    </div>
  )
}

export default MessageUser