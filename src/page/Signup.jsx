import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import { AtSign, Eye, EyeOff, LockIcon, Mail, TriangleAlert, User, X } from 'lucide-react'

function Signup() {

    const [isEyeOpen, setIsEyeOpen] = useState(true);
    const [isOtherEyeOpen, setIsOtherEyeOpen] = useState(true);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handlePassowrdClick = () => {
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

    const handleConfirmPassowrdClick = () => {
        if (confirmPasswordInputRef.current) {
            if (confirmPasswordInputRef.current.type === "text") {
                confirmPasswordInputRef.current.type = "password";
                setIsOtherEyeOpen(true);
            } else {
                confirmPasswordInputRef.current.type = "text";
                setIsOtherEyeOpen(false);
            }
        }
    }

    return (
        <div className='flex flex-col min-h-screen'>
            {/* the logo */}
            <Link to="/" className='flex items-center ms-4 mt-3 w-fit'>
                <img src={logo} alt="logo" />
                <span className='text-4xl'>Blog</span>
            </Link>

            {/* the form */}
            <form className='px-3 w-96 max-w-full sm:px-0 sm:w-96 mx-auto mt-10 flex-grow'>
                <h1 className='text-4xl font-semibold text-center mb-4'>Sign up</h1>

                {/* full name field */}
                <div className='w-full my-4'>
                    <label htmlFor="fullName" className='text-lg text-slate-200 inline-block mb-2 ps-1'>Full name</label>
                    <div className='relative'>
                        <input
                            type="text"
                            id="fullName"
                            placeholder='Jhon Doe'
                            className='w-full bg-zinc-900 hover:bg-zinc-800 py-3 px-12 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600'
                        />
                        <User size={20} className='absolute top-4 left-3' />
                    </div>
                </div>

                {/* username field */}
                <div className='w-full my-4'>
                    <label htmlFor="user" className='text-lg text-slate-200 inline-block mb-2 ps-1'>Username</label>
                    <div className='relative'>
                        <input
                            type="email"
                            id="user"
                            placeholder='DJhon'
                            className='w-full bg-zinc-900 hover:bg-zinc-800 py-3 px-12 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600'
                        />
                        <AtSign size={20} className='absolute top-4 left-3' />
                    </div>
                </div>

                {/* email field */}
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

                {/* password field */}
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
                        <button type='button' onClick={handlePassowrdClick} className='absolute top-3 right-3 hover:bg-slate-700 rounded-full p-1'>
                            {isEyeOpen ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>

                {/* password confirmation field */}
                <div className='w-full my-4'>
                    <label htmlFor="confirmPassword" className='text-lg text-slate-200 inline-block mb-2 ps-1'>Confirm password</label>
                    <div className='relative'>
                        <input
                            ref={confirmPasswordInputRef}
                            type="password"
                            id="confirmPassword"
                            placeholder='******'
                            className='w-full bg-zinc-900 hover:bg-zinc-800 py-3 px-12 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600'
                        />
                        <LockIcon size={20} className='absolute top-4 left-3' />
                        <button type='button' onClick={handleConfirmPassowrdClick} className='absolute top-3 right-3 hover:bg-slate-700 rounded-full p-1'>
                            {isOtherEyeOpen ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>

                <div className='mt-10'>
                    <input
                        type="submit"
                        value="Log in"
                        className='w-full bg-fuchsia-700 hover:bg-fuchsia-600 py-3 px-12 font-bold rounded-xl cursor-pointer'
                    />
                </div>

                <hr className='border-slate-800 my-5' />
                <p className='text-center text-slate-400'>Already have an account?<Link to="/login" className='text-slate-50 underline hover:no-underline ps-2'>Sing in</Link></p>
            </form>

            {/* footer */}
            <div className='text-slate-500 text-center w-full pb-3 mt-20'>
                Radfi Abdallah © 2024 | All rights reserved.
            </div>
        </div>
    )
}

export default Signup