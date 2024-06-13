import React from 'react'
import banner from '/banner.png';
import { FiLock, FiUser, } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';




const Signup = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='relative bg-gray-100 md:w-[50%] w-full'>
        <img src={banner} alt="" className=' md:h-screen h-auto w-full object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center'>
          <h1 className='text-5xl font-semibold mb-7'>Welcome Back!</h1>
          <h3 className='text-xl font-light mb-10'>To keep connected with us please <br /> login with your personal info</h3>

          <Link to='/login'>
            <button className="bg-transparent hover:bg-yellow-300 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded-full w-56 h-12">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
      <div className='h-screen w-full bg-white flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-center text-5xl text-yellow-400 font-bold mb-10 '>Create Account</h1>
        </div>
        <form action="">
          <div className='flex flex-col items-center'>
            <div className='w-full mb-4 flex justify-center relative'>
              <input type="text" className='bg-slate-100 w-96 p-2 pl-10' placeholder='Name' />
              <FiUser className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>
            <div className='w-full mb-4 flex justify-center relative'>
              <input type="email" className='bg-slate-100 w-96 p-2 pl-10' placeholder='Email' />
              <AiOutlineMail className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>
            <div className='w-full mb-4 flex justify-center relative'>
              <input type="password" className='bg-slate-100 w-96 p-2 pl-10 ' placeholder='Password' />
              <FiLock className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>

            <div className='w-full flex justify-center m-10'>
              <button className="bg-yellow-400 hover:bg-yellow-400 text-white font-semibold hover:text-black py-2 px-4 border border-yellow-400 hover:border-transparent rounded-full w-56 h-12">
                SIGN UP
              </button>
            </div>
          </div>
        </form>
      </div>


    </div>
  )
}

export default Signup
