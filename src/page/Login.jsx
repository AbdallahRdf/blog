import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import { Eye, EyeOff, LockIcon, Mail, TriangleAlert, X } from 'lucide-react'

function Login() {

  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const passwordInputRef = useRef(null);

  const handleClick = () => {
    if (passwordInputRef.current) {
      if (passwordInputRef.current.type === "text") {
        passwordInputRef.current.type = "password";
        setIsEyeOpen(true);
      } else {
        passwordInputRef.current.type = "text";
        setIsEyeOpen(false);
      }
    }
  }

  return (
    <>
      <Link to="/" className='flex items-center ms-4 mt-3 w-fit'>
        <img src={logo} alt="logo" />
        <span className='text-4xl'>Blog</span>
      </Link>

      <form className='px-3 w-96 max-w-full sm:px-0 sm:w-96 absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-4xl font-semibold text-center mb-4'>👋 Welcome back!</h1>
        <p className='text-lg font-normal text-center mb-6'>Log in to access your account</p>

        <div className='relative flex items-center gap-x-2 bg-red-200 py-5 px-3 my-7 rounded-xl text-lg text-red-950 text-center font-bold'>
          <TriangleAlert className='inline' /> Invalid credentials!
          <button className='absolute top-5 right-3'><X /></button>
        </div>

        <div className='w-full my-4'>
          <label htmlFor="email" className='text-lg text-slate-200 inline-block mb-2 ps-1'>Email</label>
          <div className='relative'>
            <input
              type="email"
              id="email"
              placeholder='jhondoe@example.com'
              className='w-full bg-zinc-900 hover:bg-zinc-800 py-3 px-12 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600'
            />
            <Mail size={20} className='absolute top-4 left-3' />
          </div>
        </div>

        <div className='w-full my-4'>
          <label htmlFor="password" className='text-lg text-slate-200 inline-block mb-2 ps-1'>Password</label>
          <div className='relative'>
            <input
              ref={passwordInputRef}
              type="password"
              id="password"
              placeholder='******'
              className='w-full bg-zinc-900 hover:bg-zinc-800 py-3 px-12 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600'
            />
            <LockIcon size={20} className='absolute top-4 left-3' />
            <button type='button' onClick={handleClick} className='absolute top-3 right-3 hover:bg-slate-700 rounded-full p-1'>
              {isEyeOpen ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className='w-full flex justify-between items-center px-2 mt-8'>
          <Link to="/forgot-password" className='text-slate-300 underline hover:no-underline'>Forgot password?</Link>
          <input
            type="submit"
            value="Log in"
            className='bg-fuchsia-700 hover:bg-fuchsia-600 py-2 px-12 font-bold rounded-xl cursor-pointer'
          />
        </div>

        <hr className='border-slate-800 my-5' />
        <p className='text-center text-slate-400'>Don't have an account?<Link to="/signup" className='text-slate-50 underline hover:no-underline ps-2'>Signup</Link></p>
      </form>
      <div className='text-slate-500 text-center absolute bottom-2 right-1/2 translate-x-1/2 w-full'>
        Radfi Abdallah © 2024 | All rights reserved.
      </div>
    </>
  )
}

export default Login