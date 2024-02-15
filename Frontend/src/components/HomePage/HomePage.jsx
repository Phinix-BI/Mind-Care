import React from 'react'
import Footer from '../common/Footer/Footer'
import Navbar from '../common/Navbar/Navbar'
import HeroSection from '../HeroSection/HeroSection'
import CTA from '../CTA/CTA'
import Testimonial from '../Testinomials/Testimonial'
import Features from "../Features/Features"
import {Link} from 'react-router-dom'
// import NavBar from '../common/NavBar/NavBar'
const HomePage = () => {
  return (
   <>
    <Navbar />
    <HeroSection />
    <Link to="/diagnos"><CTA /></Link>
    <Features />
    <CTA />
    
    <Testimonial />

    <Footer />
   
   </>
  )
}

export default HomePage