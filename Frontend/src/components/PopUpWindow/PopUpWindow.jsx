import React from 'react'
import Preview from '../Preview/Preview'
import { GiTireIronCross } from "react-icons/gi";
const PopUpWindow = () => {
    const [showComponent, setShowComponent] = React.useState(false);
    
    const handleSubmit = () => {
      console.log('handleSubmit');
      setShowComponent(true);
    }

    const hideComponent = () => {
      console.log('hideComponent');
      setShowComponent(false);
    }

  return (
    <div className=''>
        <div className='absolute inset-0 p-10 m-10 text-center'>
          <h1 className='text-3xl font-bold underline'>fdab</h1>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {showComponent && (
        <div className='m-5 flex justify-center'>
          
          <div className='flex'>
            <div onClick={hideComponent}><GiTireIronCross /></div>
          </div>
          <div className='flex'><Preview /></div>
          
        </div>
      )}
    </div>
  )
}

export default PopUpWindow