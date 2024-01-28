import React from 'react'
import Expertise from '../Expertise/Expertise'
import Footer from '../common/Footer/Footer'
import HeroSection from '../HeroSection/HeroSection'
import NavBar from '../common/Navbar/Navbar'

const Diagnostic = () => {
  return (
    <div>
      
      <NavBar />
      <HeroSection />
      <div className='bg-white max-w-screen-xl mx-auto'>

      {/* Our Expertise */}
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold'>Our Expertise</h1>
      </div>
      
      <div className='flex justify-center'>
         <Expertise /><Expertise />
        </div>
        <div className='flex justify-center'>
         <Expertise /> <Expertise />
        </div>

        
      </div>
      <Footer />
      
    </div>
  )
}

export default Diagnostic