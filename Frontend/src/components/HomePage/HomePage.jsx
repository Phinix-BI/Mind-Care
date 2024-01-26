import React from 'react'
import Component from '../common/Footer/Footer'
import Navbar from '../common/Navbar/Navbar'
import HeroSection from '../HeroSection/HeroSection'
import CTA from '../CTA/CTA'
// import NavBar from '../common/NavBar/NavBar'
const HomePage = () => {
  return (
   <>
   <Navbar />
    <HeroSection />
    <CTA />
    <CTA />
    {/* <Component /> */}
    <Component />
   </>
  )
}

export default HomePage