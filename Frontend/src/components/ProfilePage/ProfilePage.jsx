import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Create a CSS file for styling
import avatar from '../Assets/profile.png';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUserToken,setLoginStatus } from '../Utility/authUtils';

const ProfilePage = ({ onUpdate }) => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);

   
    useEffect(() => {
        setLoginStatus(setIsLoggedIn);
        }, [isLoggedIn]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/profile/:id', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                const { firstName, lastName, phone, email, age, gender } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setPhone(phone);
                setEmail(email);
                setAge(age);
                setGender(gender);
            } catch (error) {
                console.log(error);
                toast.error('An error occurred while fetching profile data.');
            }
        };

        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('gender', gender);
            if (image) {
                formData.append('image', image);
            }
            const response = await axios.patch('http://localhost:3000/user/profile/:id', formData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                toast('Profile Updated Successfully', {
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

    const handleLogOut = async() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };
    return (
         isLoggedIn ?
        <>
        <div className='profile-page'>
            <div className="profile-container">
                <div className="profile-box">
                    <div className='heading'>Profile</div>
                  
                    
                    <div className="profile-form">
                    <form>
                        <div className="avatar-container">
                            <label htmlFor="avatar" className="avatar-label">
                                {previewImage ? (
                                    <img src={previewImage} alt="Avatar" className="avatar-preview" />
                                ) : (
                                    <div className="avatar-placeholder"><img src={avatar} alt="Avatar" className="avatar-preview"/></div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
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
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        
                        <button onClick={handleUpdateClick}>Update</button>
                        
                        </form>
                        
                        <span className='profile-logout-text' style={{ color: '#808080' }}>come back later?&nbsp;
                        <span style={{ color: 'red' }}><Link to="/Login" onClick={handleLogOut} style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></span></span>
                    </div>
                </div>
            </div>
          
        </div>
        <ToastContainer />
        </>
        : navigate('/Login')
    ); 
};

export default ProfilePage;
