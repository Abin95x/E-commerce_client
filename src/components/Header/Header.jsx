import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart2 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";


const Header = () => {
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
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header