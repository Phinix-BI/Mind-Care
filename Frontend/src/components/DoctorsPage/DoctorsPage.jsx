import React, { useState,useEffect } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import Footer from '../common/Footer/Footer'
import NavBar from '../common/Navbar/Navbar'
import Breadcrumbs from '../common/Breadcrumbs/Breadcrumbs'
import SerchForm from '../common/SearchForm/SearchForm'
import DoctorsCard from '../DoctorsCard/DoctorsCard'
import './DoctorsPage.css'
import axios from 'axios';
// import jwt from 'jsonwebtoken';

const DoctorsPage = () => {
   
    const [doctorsAccpetedStatus,setDoctorsAccpetedStatus] = useState(false);
    
    const [alldoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        const getDoctors = async () => {
           const response = await axios.get('http://localhost:3000/doctors/profile');
              setAllDoctors(response.data);
        }
        getDoctors()

    }, []);
   

    return (
        <div className='Doctors_main_container '>

            <div className='Doctors_header_section max-w-7xl mx-auto'>
                <NavBar />
                <br/><br/><br/><br/>
                <Breadcrumbs ParentBar = {"Diagnostic"} ChildBar = {"Doctors"} />
                <br/>
                <div className='Doctors_heading'>
                    <h2>Find a Therapist on your location</h2>
                </div>
                <br/>
                <SerchForm />
                <br/><br/>
            </div>
            <div className='Doctors_body_section'>
              {alldoctors.map((doctor,index) => (
                <DoctorsCard key={index}
                    doctorsName = {doctor.firstName + " " + doctor.lastName}
                    doctorsImage = {doctor.profilePic}
                    doctorsEmail = {doctor.email}
                    number = {doctor.phone}
                    specialization = {doctor.specialization}
                    address = {doctor.address}
                    about = {doctor.about}
                    drId = {doctor._id}
                    
                />
                ))}
            </div>
            <Footer />
        </div>
    )
    }

export default DoctorsPage;