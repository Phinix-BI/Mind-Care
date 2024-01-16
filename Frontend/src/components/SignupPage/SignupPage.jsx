import React, { useState } from 'react';
//import '../ProfilePage/ProfilePage.css'; // Create a CSS file for styling
// import './SignupPage.css';
// import avatar from '../Assets/profile.png';
import styles from './SignupPage.module.css';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';
import NavBar from '../NavBar/NavBar';
import PasswordInput from '../PasswordInput/PasswordInput';


const SignupPage = ({ onCreate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    
const handleCreateClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/profile', {
                firstName, lastName, phone, email , password
            });
        
            await new Promise((resolve) => {
                toast(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: resolve
                });
            });
    
            navigate('/SignupPage');
           
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating profile.');
        }
    };
    


    return (
        <>
        <NavBar />
        <section className={`${styles.SignUp_page} `}>
        <div className={`${styles.SignUp_page_img} `}>
            <img src='/images/login-img.png'></img>
        </div>

        <div className={`${styles.SignUp_page_form} `}>
            <div>
                <h1 className={`${styles.SignUp_page_heading} `}>Create an Account</h1>
                <h1 className={`${styles.SignUp_page_heading} `}></h1>
            </div>

            <form>
            <div className={styles.name}>
                <div className={`${styles.SignUp_form} `}>
                    <label>First Name</label>
                    <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className={`${styles.SignUp_form} `}>
                    <label>Last Name</label>
                    <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>

            <div className={`${styles.SignUp_form} `}>
                <label>Phone</label>
                <input type="text" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} /> 
            </div>

            <div className={`${styles.SignUp_form} `}>  
                <label>Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />   
            </div>

            <PasswordInput password={password} setPassword={setPassword}/>
            </form>

            <Button text="Sign Up" btnClick={handleCreateClick}/>

            <div className={`${styles.SignUp_page_login} `}>
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </div>
        </div>
        <ToastContainer />
        </section>
        </>
    );
};
    
   
   

export default SignupPage;

