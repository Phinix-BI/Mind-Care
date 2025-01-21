import React from 'react'
import Appoinment from '../Appoinment/Appoinment'
import Navbar from '../common/Navbar2.0/Navbar2.0'
import Footer from '../common/Footer/Footer'
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckAppoinment = () => {
   
    const [appointmentData, setAppointmentData] = useState([]);
   
    useEffect(() => {

        const getAppoinment = async () => {
            try {
                const response = await axios.get('https://mind-care-backend.vercel.app/dr/appointment/details',{
                    params:{
                        drToken:localStorage.getItem('token')
                    }
                });
                
               setAppointmentData (response.data.Found_data.appointmentDetails);
                
               
            } catch (err) {
                console.error(err.message);
            }
        }; 

        // time interval is the temp solution for the real time data update.
        // In future we will use socket.io for real time data update.

        let timerId = setInterval(() => getAppoinment(), 500);

        return () => {
            clearInterval(timerId);
        }
        
    }
    ,[]);

    useEffect(() => {
        console.log(appointmentData);
    });

  return (
    <>
    <Navbar />
        <div className='max-w-screen-xl mx-auto p-4 mt-10 mb-20'>
            <h1 className='font-bold text-4xl mx-3 my-4 py-4'>Appoinment Request</h1>

            <div className='m-3'>
                <h1 className='font-semibold text-2xl '>Pending Appoinments</h1>
                <div>
                   { appointmentData.map((appointment, index) => {
                        if (appointment.reqAccepted === false) {
                            return (
                                <Appoinment 
                                    key={index}
                                    Patientname={appointment.userDetails.fullName}
                                    years={appointment.userDetails.age}
                                    gender={appointment.userDetails.gender === 'male' ? <IoMdMale /> : <IoMdFemale />}
                                    session={45}
                                    pateintId={appointment.userId}
                                    accepted={false}
                                />
                            );
                        }
                    })
                    }
                            
                        
                </div>
            </div>
            <div className='m-3'>
                <h1 className='font-semibold text-2xl '>Accepted Appoinments</h1>
                <div>
                { appointmentData.map((appointment, index) => {
                        if (appointment.reqAccepted === true) {
                            return (
                                <Appoinment 
                                    key={index}
                                    Patientname={appointment.userDetails.fullName}
                                    years={appointment.userDetails.age}
                                    gender={appointment.userDetails.gender === 'male' ? <IoMdMale /> : <IoMdFemale />}
                                    session={45}
                                    pateintId={appointment.userId}
                                    accepted={true}
                                />
                            );
                        }
                    })
                    }
                            
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default CheckAppoinment