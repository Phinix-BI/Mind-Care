import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import Footer from '../common/Footer/Footer'
const Appoinment = (props) => {
  return (
    <>
        <ul className='flex w-full justify-between'>
            <div className='flex'>
                <div className='p-2 my-auto'>
                    <img src="images\1.jpg" alt="" className='w-12'></img>
                </div>
                <div className='p-2 my-2'>
                    <p className='font-semibold text-xl flex'>{props.Patientname}({props.years})
                        <i className='text-2xl p-1 mx-2'>{props.gender}</i>
                    </p>
                    <p className='text-md text-gray-500'>Requested for a {props.session} minutes - live appoinment</p>
                </div>
            </div>
            <div className='flex justify-end'>
                {!props.accepted ? (
                    <>
                        <li className='p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-red-300 rounded-lg'>
                            <RxCross2 />
                        </li>
                        <li className='p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-green-300 rounded-lg'>
                        <MdOutlineDone />
                        </li>
                
                    </>
                ): <button className="p-2 my-auto h-10 font-semibold rounded-lg bg-gray-300" type="submit">
                    Accepted
                </button>}
            </div>
        </ul>
    </>

  )
}

export default Appoinment