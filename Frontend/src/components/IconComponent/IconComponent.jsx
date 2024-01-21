import React, { useState } from 'react';
import Styles from './IconComponent.module.css';
import { FaUserDoctor, FaUser } from "react-icons/fa6";

function IconComponent() {
  const [color, setColor] = useState('grey');
  const [color2, setColor2] = useState('rgb(255, 0, 255)');

  let vari = "null"

  const colorChnage = () => {
    setColor("rgb(255, 0, 255)")
    setColor2("grey")
    vari = "Doctor"
    console.log(vari)
  }

  const colorChnage2 = () => {
    setColor2("rgb(255, 0, 255)")
    setColor("grey") 
    vari = "Patient"
    console.log(vari)
  }
  return (
    <div className={Styles.container}>

      <div onClick={colorChnage2}>
        <i style={{color: color2}}><FaUser /></i>
        <p style={{color: color2}}>Patient</p>
      </div>
      <div onClick={colorChnage}>
        <i style={{color: color}}><FaUserDoctor /></i>
        <p style={{color: color}}>Doctor</p>
      </div>
    </div>
  );
}

export default IconComponent;