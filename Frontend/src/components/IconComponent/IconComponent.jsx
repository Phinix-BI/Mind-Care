import React, { useState } from 'react';
import Styles from './IconComponent.module.css';
import { FaUserDoctor, FaUser } from "react-icons/fa6";

function IconComponent() {
  const [color, setColor] = useState('grey');
  const [color2, setColor2] = useState('#5cc7bf');

  let vari = "Patient"

  const colorChnage = () => {
    
    setColor("#5cc7bf")
    setColor2("grey")
    vari = "Doctor"
    console.log(vari)
  }

  const colorChnage2 = () => {
    setColor2("#5cc7bf")
    setColor("grey") 
    vari = "Patient"
    console.log(vari)
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