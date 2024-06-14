import React, { useState } from 'react';
import banner from '../../assets/banner.png';
import { FiLock } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        toast.error('Please enter email');
      } else {
        toast.error('Please enter password');
      }
      return;
    }    

    try {
      const response = await login({ email: email, password: password });
      if (response?.status === 200) {
        toast.success('Signup successful');
        localStorage.setItem('usertoken', response?.data?.usertoken);
        navigate('/home');
      } else {
        toast.error('Email or password incorrect');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className='flex flex-col  md:flex-row-reverse'>
      <div className='relative bg-gray-100 md:w-[50%] w-full'>
        <img src={banner} alt="" className=' md:h-screen h-auto w-full object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center'>
          <h1 className='text-5xl font-semibold mb-7'>Hello Friend!</h1>
          <h3 className='text-xl font-light mb-10'>Enter your personal details and <br /> start your journey with us</h3>
          <Link to="/">
            <button className="bg-transparent hover:bg-yellow-300 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded-full w-56 h-12 transition-colors duration-300">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
      <div className='h-screen w-full bg-white flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-center text-5xl text-yellow-400 font-bold mb-10 '>Sign In to <br /> Your Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center'>
            <div className='w-full mb-7 flex justify-center relative'>
              <input
                type="email"
                className='bg-slate-100 w-96 p-2 pl-10'
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <AiOutlineMail className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>
            <div className='w-full mb-4 flex justify-center relative'>
              <input
                type="password"
                className='bg-slate-100 w-96 p-2 pl-10 '
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <FiLock className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>
            <p className='font-bold underline'>forgot password?</p>
            <div className='w-full flex justify-center m-5'>
              <button onClick={handleSubmit} type='submit' className="bg-yellow-400 hover:bg-yellow-400 text-white font-semibold hover:text-black py-2 px-4 border border-yellow-400 hover:border-transparent rounded-full w-56 h-12 transition-colors duration-300">
                SIGN IN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
