import React from 'react';
import styles from './NavBar.module.css';
import Button from '../Button/Button';

const NavBar = () => {
  return (
    <nav className={`${styles.navbar} container`}>
        <div className='logo'>
            <h1>MindCare.</h1>
        </div>

        <ul>
            <li href="#">Home</li>
            <li href="#">Service</li>
            <li href="#">Contact</li>
            <li href="#">About US</li>
        </ul>
        <Button text = "Login"/>
    </nav>
  )
}
export default NavBar;
