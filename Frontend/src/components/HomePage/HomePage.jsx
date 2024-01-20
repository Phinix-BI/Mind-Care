import React from 'react'
import NavBar from '../NavBar/NavBar'
import Button from '../Button/Button'
import Styles from './HomePage.module.css'
import Footer from '../common/Footer/Footer'
import { KeyFeatures } from '../KeyFeatures/KeyFeatures'
const HomePage = () => {
  return (
   <section className={Styles.home}>
    {/* <NavBar /> */}
    <div className={Styles.container}>
        <div className={Styles.text}>
            <p>Mental Health Is Wealth</p>
            <h1>Set The Stage For A Clamer Mind</h1>
            <p>Learn to manage feeling thoughts with the lifelong skill of everyday mindfulness, any time of the day. Make your mind Clamer and happier.</p>
            <Button text="Get Started"/>
        </div>

        <div className={Styles.img}>
            <img src="images/yoga.png" alt="home" />
        </div>
    </div>

    <div className={Styles.container}>
        <div className={Styles.img}>
            <img src="images/Yoga.jpg" alt="home" />
        </div>

        <div className={Styles.text}>
            <h1>We Provide Quality Care That Treats Everyone</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
            <Button text="Sign In"/>
            <Button text="Learn More"/>
        </div>
    </div>

    <div className={Styles.container}>
        <div className={Styles.img}>
            <img src="images/female-doctor.png" alt="home" />
        </div>

        <div className={Styles.text}>
            <h1>Quality care for you and the ones you Love</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
            <Button text="Get Started"/>
        </div>
    </div>
    <KeyFeatures />
    <Footer />
   </section>
  )
}

export default HomePage