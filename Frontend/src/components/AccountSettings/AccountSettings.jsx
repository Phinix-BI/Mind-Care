import { useState } from 'react'
import { MdExitToApp } from "react-icons/md";
import Button from '../Button/Button'
const AccountSettings = () => {
    const handleLogout = () => {
        console.log('Logout')
    }
    
    const [imageUrl, setImageUrl] = useState('images/1.jpg');
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='mx-auto max-w-screen-lg h-100vh'>
            <a className='flex justify-end'>
                <div className='flex' onClick={handleLogout}>
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
                            <input type='text' placeholder='Eg.- Harper Cruz' className="mt-1 p-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
          
                    <div className='flex justify-between m-5'>
                        <div className='w-2/5'>
                            <div className='flex flex-col'>
                                <label htmlFor='name' className="text-gray-800">Your Gender : </label>
                                    <select id="gender" className="mt-1 p-2 border border-gray-300 rounded-md">
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
                                <input type='number' placeholder='Eg.- 45' className="mt-1 p-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                    </div>



                    <div className='m-5'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className="text-gray-800">Email Address : </label>
                            <input type='email' placeholder='Eg.- abc@gmail.com' className="mt-1 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className='text-end text-blue-400 mx-5'><a>Change</a></div>
                    </div>

                    <div className='m-5'>
                        <a className='text-red-500'>Delete Your Account</a>
                        <p>Account deletion imminent. All data will be lost permanently. Proceed with caution.</p>
                        <div className='flex justify-between my-6'>
                            <button className='bg-gray-200 px-10 py-2 rounded'>Cancel</button>
                            <button className='bg-blue-400 px-10 py-2 rounded'>Save</button>
                        </div>
                    </div>

                </div>

                {/* IMG */}
                <div className='p-10 m-6 s:w-1/2'>
                    <img className='size-32 mx-auto rounded-full' src={imageUrl} alt='Profile Picture' />
                    <button className='bg-blue-400 px-10 py-2 rounded mt-5'>Change</button>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings