import React from 'react';
import Navbar from '../common/Navbar2.0/Navbar2.0';
import Loader from '../common/Loader/Loader'
const AI_Response = () => {
  return (
    <div className='w-full max-w-screen-2xl mx-auto'>
      <Navbar />
      <div className='flex gap-4 w-fit mx-auto text-3xl font-semibold p-2 shadow-lg'>
        <h1 className='p-4'>Analyzing response</h1>
        <div className='p-4'><Loader /></div>
      </div>
    </div>
  );
};

export default AI_Response;
