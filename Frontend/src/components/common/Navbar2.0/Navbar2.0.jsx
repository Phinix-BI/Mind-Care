import React from 'react'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
                <nav className='w-full max-w-screen-2xl mx-auto p-4' role='navigation'>
                        
                        <div className=''>
                <ul className='flex justify-between'>
                    {/* Brand */}
                    <li className='text-xl font-semibold p-2 m-2 my-auto'>
                        <p>MindCare.</p>
                    </li>
                    {/* Icon + Home */}
                    <div className='flex justify-end'>
                        {/* Home */}
                        <li className='p-2 m-2 my-auto hover:bg-gray-300 rounded-lg'>
                            <Link to="/"><i className='text-3xl'><FaHome /></i></Link>
                        </li>
                        {/* Logo */}
                        <Link to="/ProfilePage"><li className='p-2 m-2 hover:bg-gray-300 rounded-lg'>
                            <img src="images\1.jpg" className='w-8 rounded-full'/>
                        </li></Link>
                    </div>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar