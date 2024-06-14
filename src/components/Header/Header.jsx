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
            <div className=' w-full flex justify-around items-center'>
                <div className='relative'>
                    <input type="text" className='bg-white rounded-xl h-10' />
                    <button className='bg-yellow-400 rounded-xl absolute left-48 p-2'>Search</button>
                </div>
                <div className='text-white'>
                    <ul className='flex gap-3 items-center'>
                        <IoMdHeartEmpty /> <li><Link>wishlist</Link></li>
                        <BsCart2 />   <li><Link>cart</Link></li>
                        <div onClick={handleLogout} className='flex items-center mx-10 bg-red-500 p-1 rounded-lg hover:bg-yellow-300 hover:text-black'><button className=''>Logout</button> <RiLogoutBoxRFill /></div>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header