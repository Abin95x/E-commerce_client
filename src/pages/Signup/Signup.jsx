import React from 'react'
import banner from '../../assets/banner.png';
import { FiLock, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { signup } from '../../api/userApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    const response = await signup(data)
    console.log(response?.data);
    if(response?.status === 200){
      toast('Signup successful')
      localStorage.setItem('usertoken', response?.data?.usertoken);
      navigate('/home')
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='relative bg-gray-100 md:w-[50%] w-full'>
        <img src={banner} alt="" className=' md:h-screen h-auto w-full object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center'>
          <h1 className='text-5xl font-semibold mb-7'>Welcome Back!</h1>
          <h3 className='text-xl font-light mb-10'>To keep connected with us please <br /> login with your personal info</h3>
          <Link to='/login'>
            <button className="bg-transparent hover:bg-yellow-300 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded-full w-56 h-12 transition-colors duration-300">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
      <div className='h-screen w-full bg-white flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-center text-5xl text-yellow-400 font-bold mb-10 '>Create Account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center relative'>
            <div className='w-full mb-7 flex justify-center relative'>
              {errors.name && <p className="text-red-500 absolute left-0 top-10">{errors.name.message}</p>}
              <input
                type="text"
                className='bg-slate-100 w-96 p-2 pl-10'
                placeholder='Name'
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              <FiUser className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>

            <div className='w-full mb-7 flex justify-center relative'>

              {errors.email && <p className="text-red-500 absolute left-0 top-10">{errors.email.message}</p>}
              <input
                type="email"
                className='bg-slate-100 w-96 p-2 pl-10'
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => {
                    if (!value.includes('@')) {
                      return 'Email must include @'
                    }
                    return true
                  }
                })}
              />
              <AiOutlineMail className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>

            <div className='w-full mb-7 flex justify-center relative'>
              {errors.password && <p className="text-red-500 absolute left-0 top-10">{errors.password.message}</p>}
              <input
                type="password"
                className='bg-slate-100 w-96 p-2 pl-10 '
                placeholder='Password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters'
                  }
                })}
              />
              <FiLock className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            </div>

            <div className='w-full flex justify-center m-10'>
              <button type='submit' disabled={isSubmitting} className="bg-yellow-400 hover:bg-yellow-400 text-white font-semibold hover:text-black py-2 px-4 border border-yellow-400 hover:border-transparent rounded-full w-56 h-12 transition-colors duration-300">
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
