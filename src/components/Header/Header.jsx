import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart2 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('usertoken');
        toast('Logged out successfully');
        navigate('/login');
    };
    return (
        <div className='w-full h-20 bg-[#003F62] flex items-center'>
            <div className='w-full flex justify-between items-center px-4 md:px-8'>
                <div className='relative flex-grow max-w-xs'>
                    <input type="text" className='bg-white rounded-xl h-10 w-full pl-4 pr-16' placeholder="Search..." />
                    <button className='bg-yellow-500 rounded-xl absolute right-0 top-0 bottom-0 p-2'>Search</button>
                </div>
                <div className='text-white flex items-center space-x-6'>
                    <div className='hidden md:flex items-center gap-3'>
                        <IoMdHeartEmpty className='text-xl' />
                        <li className='list-none'><Link to='/wishlist'>Wishlist</Link></li>
                    </div>
                    <div className='hidden md:flex items-center gap-3'>
                        <BsCart2 className='text-xl' />
                        <li className='list-none'><Link to='/cart'>Cart</Link></li>
                    </div>
                    <div onClick={handleLogout} className='flex items-center bg-red-500 p-2 rounded-lg hover:bg-yellow-300 hover:text-black cursor-pointer  transition-colors duration-300'>
                        <button className='mr-2'>Logout</button>
                        <RiLogoutBoxRFill className='text-xl' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
