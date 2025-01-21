import React, { useState, useEffect } from 'react';
import { MdExitToApp } from "react-icons/md";
import avatar from '../Assets/profile.png';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUserToken,setLoginStatus } from '../Utility/authUtils';
import Button from '../Button/Button'

const AccountSettings = ({onUpdate}) => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const[fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('images/1.jpg');
    const [address, setAddress] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [about, setAbout] = useState('');
    const [role, setRole] = useState('Patient');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

   
    useEffect(() => {
        setLoginStatus(setIsLoggedIn);
        }, [isLoggedIn]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mind-care-backend.vercel.app/user/profile', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });

                const role = response.data.role;
                setRole(role);
                const { firstName, lastName, phone, email, age, gender } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setFullName(firstName + ' ' + lastName);
                setPhone(phone);
                setEmail(email);
                setAge(age);
                setGender(gender);
                // setImageUrl(response.data.profilePic);
                setAddress(response.data.address);
                setSpecialization(response.data.specialization);
                setAbout(response.data.about);

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
            formData.append('firstName',fullName.split(' ')[0]);
            formData.append('lastName', fullName.split(' ')[1]);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('address', address);
            formData.append('specialization', specialization);
            formData.append('about', about);
            if (image) {
                formData.append('image', image);
            }
            const response = await axios.patch('https://mind-care-backend.vercel.app/user/profile/:id', formData, {
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
        // isLoggedIn ?  
        <>
        <div className='mx-auto max-w-screen-lg h-100vh'>
            <a className='flex justify-end'>
                <div className='flex' onClick={handleLogOut}>
                    <p>Logout </p>
                    <MdExitToApp className='size-5 m-1'/>
                </div>
            </a>

            <div className=''>
                <div className='m-10'>
                    <h1 className='text-4xl font-bold'>Account Settings</h1>
                    <p className='text-gray-400'>Edit your Avtar, Name, etc.</p>
                </div>
            </div>

            <div className='flex justify-center shadow-xl rounded-3xl'>
                <div className='p-10'>
                    <div className='m-5'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className="text-gray-800">Your Name : </label>
                            <input type='text' placeholder='Eg.- Harper Cruz' value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
          
                    <div className='flex justify-between m-5'>
                        <div className='w-2/5'>
                            <div className='flex flex-col'>
                                <label htmlFor='name' className="text-gray-800">Your Gender : </label>
                                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">LGBTQIA+</option>
                                        <option value="not-specified">Prefer not to say</option>
                                    </select>
                            </div>
                        </div>

                        <div className='w-2/5 mx-5'>
                            <div className='flex flex-col'>
                                <label htmlFor='name' className="text-gray-800">Your Age : </label>
                                <input type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='Eg.- 45' className="mt-1 p-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                    </div>

                    <div className='m-5'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className="text-gray-800">Email Address : </label>
                            <input type='email' placeholder='Eg.- abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                    </div>

                {role === 'Doctor' ? ( 
                    <>
                    <div className='m-5'>
                             <div className='flex flex-col'>
                                <label htmlFor='name' className="text-gray-800">Phone : </label>
                                <input type='text' placeholder='Eg.- 8048752050' value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                        </div>


                        <div className='m-5'>
                             <div className='flex flex-col'>
                                <label htmlFor='name' className="text-gray-800">Specialization : </label>
                                <input type='text' placeholder='Eg.- Mentalist , M.B.B.S' value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                        </div>

                        <div className='m-5'>
                              <div className='flex flex-col'>
                                    <label htmlFor='name' className="text-gray-800">Address : </label>
                                    <input type='text' placeholder='Eg.- New York City, USA' value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                 <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                        </div>
                    </>
                ): null}


                    <div className='m-5'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className="text-gray-800">About : </label>
                            <textarea placeholder='Eg.- Share your thoughts and feelings...' value={about} onChange={(e) => setAbout(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                    </div>


                    <div className='m-5'>
                        <a className='text-red-500'>Delete Your Account</a>
                        <p>Account deletion imminent. All data will be lost permanently. Proceed with caution.</p>
                        <div className='flex justify-between my-6'>
                            <button className='bg-gray-200 px-10 py-2 rounded'>Cancel</button>
                            <button onClick={handleUpdateClick} className='bg-blue-400 px-10 py-2 rounded'>Save</button>
                        </div>
                    </div>

                </div>
                
                {/* IMG */}
                <div className='p-8 m-6 s:w-1/2'>

                <form>
               <label htmlFor="image-upload">
                {previewImage ? (
                  <img className='size-32 mx-auto rounded-full avtar-preview'  src={previewImage} alt='Profile Picture' />  
                ):(
                    <img className='size-32 mx-auto rounded-full' src={imageUrl} alt='Profile Picture' />
                )}
            </label>
                <input type="file" id="image-upload" accept="image/*" hidden onChange={handleImageChange}/>

                <label htmlFor="image-upload" className='bg-blue-400 px-6 py-2 rounded mt-4 inline-block '>Change</label>
               
                 </form>
                
                {/* </div> */}
                    
                   
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
        // : navigate('/Signup_Login_Form')
    )
}

export default AccountSettings