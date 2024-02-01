import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import Footer from '../common/Footer/Footer'
import NavBar from '../common/Navbar/Navbar'
import Breadcrumbs from '../common/Breadcrumbs/Breadcrumbs'
import SerchForm from '../common/SearchForm/SearchForm'
import DoctorsCard from '../DoctorsCard/DoctorsCard'
import './DoctorsPage.css'

const DoctorsPage = () => {

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
                <DoctorsCard />
                <DoctorsCard />
            </div>
            <Footer />
        </div>
    )
    }

export default DoctorsPage;