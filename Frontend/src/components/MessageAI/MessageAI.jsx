import React from 'react'

const MessageAI = () => {
  return (
    <div className='flex w-full py-2 px-1'>
        {/* img */}
        <div className='w-10 my-auto mx-2 rounded-full overflow-hidden'>
            <img src="images\1.jpg" />
        </div>

        {/* Message */}
        <div className='bg-yellow-100 max-w-xl rounded-xl flex p-2'>
            <div className='flex'>
              <p className='p-2'>Message Message</p>
              <p className='relative -bottom-7 text-xs text-gray-500'>05:08</p>
            </div>
        </div>
    </div>
  )
}


export default MessageAI