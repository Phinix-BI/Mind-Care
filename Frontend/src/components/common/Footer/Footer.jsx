import React from 'react'
import Styles from './Footer.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={Styles.footer}>
        <div className={Styles.Social}>
            <h1>MindCare.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <br />
            <div className={Styles.link}>
                <div className={Styles.SocialIcon}>
                    <FaFacebook />
                </div>
                <div className={Styles.SocialIcon}>
                    <FaInstagram />
                </div>
                <div className={Styles.SocialIcon}>
                    <FaTwitter  />
                </div>
                <div className={Styles.SocialIcon}>
                    <FaLinkedin />
                </div>
            </div>

            <br />
            <br />
            <p>Lorem ipsum dolor sit amet.</p>
        </div>

        <div className={Styles.QuickLinks}>
            <h1>Quick Links</h1>
            <p>Home</p>
            <p>Service</p>
            <p>About</p>
            <p>Contact</p>
        </div>

        <div className={Styles.address}>
            <h1>Address</h1>
            <p>123, Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <p>Phone: +91 1234567890</p>
            <p>Email: mindcare@gmail.com</p>
        </div>
    </div>
  )
}

export default Footer;