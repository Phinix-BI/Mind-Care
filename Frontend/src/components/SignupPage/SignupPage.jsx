import React, { useState } from 'react';
// import '../ProfilePage/ProfilePage.css'; // Create a CSS file for styling
// import './SignupPage.css';
// import avatar from '../Assets/profile.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignupPage = ({ onUpdate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

const handleUpdateClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:3000/user/profile/:id', {
                firstName, lastName, phone, email, age, gender, image, previewImage
            });
            if (response.status === 200) {
                toast('Profile Updated Succesfully', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else {
                toast.error('Failed to update profile.');
            }
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
                    <div className='heading'>SignUp</div>
                  
                    
                    <div className="profile-form">
                    <form>
                       
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                       
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <br />
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

                        <button onClick={handleUpdateClick}>SignUp</button>
                        
                        </form>
                        
                        <span className='profile-logout-text' style={{ color: '#808080' }}>come back later?&nbsp;
                        <span style={{ color: 'red' }}><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></span></span>
                    </div>
                </div>
            </div>
          
        </div>
        <ToastContainer />
        </>
    );
};
    
   
   

export default SignupPage;

