import React, { useState } from 'react';
import Styles from './IconComponent.module.css';
import { FaUserDoctor, FaUser } from "react-icons/fa6";

const IconComponent= ({role,setRole})=> {
  const [color, setColor] = useState('grey');
  const [color2, setColor2] = useState('#5cc7bf');
  
  let userType = "Patient"

  const colorChnage = () => {
    
    setColor("#5cc7bf")
    setColor2("grey")
    userType = "Doctor"
    console.log(userType)
    setRole(userType)
  }

  const colorChnage2 = () => {
    setColor2("#5cc7bf")
    setColor("grey") 
    userType = "Patient"
    console.log(userType);
    setRole(userType)
  }


  return (
    <div className={Styles.container2}>

      <div onClick={colorChnage2} className='color-box'>
        <i style={{color: color2}}><FaUser /></i>
        <p style={{color: color2}}>Patient</p>
      </div>
      <div onClick={colorChnage} className='color-box'>
        <i style={{color: color}}><FaUserDoctor /></i>
        <p style={{color: color}}>Doctor</p>
      </div>
    </div>
  );
}

export default IconComponent;