import React, { useState } from 'react';
// import '../ProfilePage/ProfilePage.css'; // Create a CSS file for styling
// import './SignupPage.css';
// import avatar from '../Assets/profile.png';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = ({ onCreate }) => {
   
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    
const handleLoginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email , password 
            });
            
            localStorage.setItem('token', response.data.token);
           
            window.location = '/ProfilePage';
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
        <div className='profile-page'>
            <div className="profile-container">
                <div className="profile-box">
                    <div className='heading'>LogIn</div>
                  
                    <div className="profile-form">
                    <form>
                       
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />

                        <button onClick={handleLoginClick}>LogIn</button>
                        
                        </form>
                        
                        <span className='profile-logout-text' style={{ color: '#808080' }}>Not a Member&nbsp;
                        <span style={{ color: 'red' }}><Link to="/SignupPage" style={{ textDecoration: 'none', color: 'inherit' }}>Register Now</Link></span></span>
                    </div>
                </div>
            </div>
          
        </div>
        <ToastContainer />
        </>
    );
};
    
   
   

export default LoginPage;

