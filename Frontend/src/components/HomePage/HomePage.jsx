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
    <CTA titleUpper = {"Begin Your Path "} titleLower = {"to Mental Wellness"} content={"Explore resources and support for a healthier mind. Take our personalized mental health assessment to gain insights and begin your wellness journey today."} 
    link = "/DiagnosTest"
    />
    <Features />
    <CTA titleUpper = {"Your Virtual Support  "} titleLower = {"Companion"} content={"Connect with our AI Therapists for confidential, 24/7 support. Whether it's day or night, our virtual companions are here to listen, provide guidance, and help you navigate your mental health journey"} 
    link = "/chat"
    />
    
    <Testimonial />

    <Footer />
   
   </>
  )
}

export default HomePage