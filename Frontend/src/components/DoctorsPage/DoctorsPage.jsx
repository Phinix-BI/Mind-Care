import React, { useState, useEffect } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import Footer from '../common/Footer/Footer'
import NavBar from '../common/Navbar/Navbar'
import Breadcrumbs from '../common/Breadcrumbs/Breadcrumbs'
import SearchForm from '../common/SearchForm/SearchForm'
import DoctorsCard from '../DoctorsCard/DoctorsCard'
import './DoctorsPage.css'
import axios from 'axios';

const DoctorsPage = () => {
    const [doctorsAcceptedStatus, setDoctorsAcceptedStatus] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const [doctorsIds, setDoctorsIds] = useState([]);

    useEffect(() => {
        const getDoctors = async () => {
            const response = await axios.get('https://mind-care-backend.vercel.app/doctors/profile');
            setAllDoctors(response.data);
        };

        const getDoctorId = async () => {
            const response = await axios.get('https://mind-care-backend.vercel.app/user/profile', {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            setDoctorsIds(response.data.drAppointmentId || []); // Set default value to empty array if undefined
        };

        getDoctors();
        getDoctorId();
    }, []);

    

    return (
        <div className='Doctors_main_container '>
            <div className='Doctors_header_section max-w-7xl mx-auto'>
                <NavBar />
                <br /><br /><br /><br />
                <Breadcrumbs ParentBar={"Diagnostic"} ChildBar={"Doctors"} />
                <br />
                <div className='Doctors_heading'>
                    <h2>Find a Therapist in your location</h2>
                </div>
                <br />
                <SearchForm />
                <br /><br />
            </div>
            <div className='Doctors_body_section'>
                {allDoctors.map((doctor, index) => (
                    <DoctorsCard
                        key={index}
                        doctorsName={doctor.firstName + " " + doctor.lastName}
                        doctorsImage={doctor.profilePic}
                        doctorsEmail={doctor.email}
                        number={doctor.phone}
                        specialization={doctor.specialization}
                        address={doctor.address}
                        about={doctor.about}
                        drId={doctor._id}
                        reqStatus={doctorsIds.includes(doctor._id)}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default DoctorsPage;
