import React, { useState } from 'react';
import './ProfilePage.css'; // Create a CSS file for styling
import avatar from '../Assets/profile.png';
import { Link } from 'react-router-dom';
const ProfilePage = ({ onUpdate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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

    const handleUpdateClick = () => {
        onUpdate({
            firstName,
            lastName,
            phone,
            email,
            age,
            gender,
            image
        });
    };

    return (
        <div className='profile-page'>
            <div className="profile-container">
                <div className="profile-box">
                    <div className='heading'>Profile</div>
                    
                    <div className="profile-form">
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
                        <br />
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
                        <br />
                        <button onClick={handleUpdateClick}>Update</button>
                        <span className='profile-logout-text' style={{ color: '#808080' }}>come back later?&nbsp;
                        <span style={{ color: 'red' }}><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
    
   
   

export default ProfilePage;

