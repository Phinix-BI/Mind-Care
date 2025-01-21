import {React,useState,useEffect} from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import Footer from '../common/Footer/Footer'
import axios from 'axios';

const Appoinment = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [accepted, setAccepted] = useState(false);
    
    const handelCross = async () => {
        try {
            const response = await axios.delete('https://mind-care-backend.vercel.app/dr/appointment/delete',
           
            {
                params:{
                    drToken:localStorage.getItem('token'),
                    patientId:props.pateintId,
                } 
            });
            
            setIsDeleted(true);
            setAccepted(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    const withdrawRequest = async() => {

        const response = await axios.delete('https://mind-care-backend.vercel.app/user/dr/id/delete',
        {
            params:{
                drToken:localStorage.getItem('token'),
                patientId:props.pateintId,
            } 
        }
        );

      }
   
    const handelDone = async () => {
        try{
            const response = await axios.put('https://mind-care-backend.vercel.app/dr/req/acceptstatus',{
                drToken:localStorage.getItem('token'),
                userId:props.pateintId,
                reqAccepted:true
            });
        setAccepted(true);
        setIsDeleted(true);
        }catch(err){
            console.error(err.message);
        }
        
    }

    if(isDeleted){
        return null;
    }
    if(accepted){
        return null;
    }


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
                        <li className='p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-red-300 rounded-lg' onClick={{handelCross,withdrawRequest}}>
                            <RxCross2 />
                        </li>
                        <li className='p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-green-300 rounded-lg' onClick={handelDone}>
                        <MdOutlineDone />
                        </li>
                
                    </>
                ): <button className="p-2 my-auto h-10 font-semibold rounded-lg bg-gray-300" type="submit" onClick={{handelCross,withdrawRequest}}>
                    CheckUp Done
                </button>}
            </div>
        </ul>
    </>

  )
}

export default Appoinment