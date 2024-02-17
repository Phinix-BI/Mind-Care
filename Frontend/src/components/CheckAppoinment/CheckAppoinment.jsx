import React from 'react'
import Appoinment from '../Appoinment/Appoinment'
import Navbar from '../common/Navbar2.0/Navbar2.0'
import Footer from '../common/Footer/Footer'
import { IoMdMale, IoMdFemale } from "react-icons/io";
const CheckAppoinment = () => {
  return (
    <>
    <Navbar />
        <div className='max-w-screen-xl mx-auto p-4 mt-10 mb-20'>
            <h1 className='font-bold text-4xl mx-3 my-4 py-4'>Appoinment Request</h1>

            <div className='m-3'>
                <h1 className='font-semibold text-2xl '>Pending Appoinments</h1>
                <div>
                    <Appoinment 
                        Patientname={"John Doe"}
                        years= {36}
                        gender = {<IoMdMale />}
                        session= {45}
                        accepted= {false}
                    />
                    <Appoinment 
                        Patientname={"Biswajit Dey"}
                        years= {27}
                        gender = {<IoMdFemale />}
                        session= {30}
                        accepted= {false}
                    />
                </div>
            </div>
            <div className='m-3'>
                <h1 className='font-semibold text-2xl '>Accepted Appoinments</h1>
                <div>
                    <Appoinment 
                        Patientname={"John Doe"}
                        years= {36}
                        gender = {<IoMdMale />}
                        session= {45}
                        accepted= {true}
                    />
                    <Appoinment 
                        Patientname={"Biswajit Dey"}
                        years= {27}
                        gender = {<IoMdFemale />}
                        session= {30}
                        accepted={true}
                    />
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default CheckAppoinment