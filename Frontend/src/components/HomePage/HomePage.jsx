import React from 'react'
import NavBar from '../NavBar/NavBar'
import Button from '../Button/Button'
import Styles from './HomePage.module.css'
import Footer from '../common/Footer/Footer'
const HomePage = () => {
  return (
   <section className={Styles.home}>
    <NavBar />
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

    <Footer />
   </section>
  )
}

export default HomePage