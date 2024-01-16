import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import styles1 from '../Button/Button.module.css';
// import '../ProfilePage/ProfilePage.css'; // Create a CSS file for styling
// import './SignupPage.css';
// import avatar from '../Assets/profile.png';

import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';


const SignupPage = ({ onCreate }) => {
   
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    // const navigate = useNavigate();
    
const handleLoginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email , password 
            });
            
            localStorage.setItem('token', response.data.token);
           
            // window.location = '/ProfilePage';
              toast(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

           
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating profile.');
        }
    };
    


    return (
        <>
        <NavBar />
        <section className={`${styles.login_page} `}>
        
        <div className={`${styles.login_page_form} `}>
            <h1 className={`${styles.login_page_heading} `}>Welcome Back,</h1>
            <h1 className={`${styles.login_page_heading} `}>Howard</h1>
            <form>
                <div className={`${styles.login_form} `}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                {/* <div className={`${styles.login_form} `}>
                    <label htmlFor="email">Paassword</label>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </from>

            <div className={styles.abc}>
                <div className={`${styles.login_page_remember_me} `}>
                    <input type="checkbox" id="remember_me" />
                    <label htmlFor="remember_me">Remember Me</label>
                </div>
                <div className={`${styles.forgot_password} `}>
                    <Link to="/ForgotPassword">Forgot Password?</Link>
                </div>
            </div>

            <div className={`${styles.login_page_signup} `}>
                <p>Don't have an account? <a href="/SignupPage">Sign Up</a></p>
            </div>
        </div>
        <div className={`${styles.login_page_img} `}>
            <img src="public\images\5861790.webp" alt="login" />
        </div>

        <ToastContainer />
        </section>
        </>
    );
};
    
   
   

export default SignupPage;

