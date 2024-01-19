import React from 'react'
import Styles from './KeyFeatures.module.css'
import { FaUserDoctor } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiConversation } from "react-icons/gi";

export const KeyFeatures = () => {
  return (
    <div className={Styles.container}>
        <div><h1>Why to Choose Us..</h1></div>

        <div>
            <ul>
                <div className={Styles.Points}>
                    <div className={Styles.icon}><GiConversation /></div>
                    <li className={Styles.text}>1:1 Conversation</li>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    Lorem ipsum dolor sit amet.</p>
                </div>
                <div className={Styles.POints}>
                    <div className={Styles.icon}><RiCustomerService2Fill /></div>
                    <li className={Styles.text}>24/7 Service</li>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    Lorem ipsum dolor sit amet.</p>
                </div>
                <div className={Styles.Points}>
                    <div className={Styles.icon}><FaUserDoctor /></div>
                    <li className={Styles.text}>Chat With Ai Doctors</li>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    Lorem ipsum dolor sit amet.</p>
                </div>
            </ul>
        </div>
    </div>
  )
}
