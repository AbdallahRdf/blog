import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import { AtSign, Eye, EyeOff, LockIcon, Mail, User } from 'lucide-react'
import LogoWithText from '../components/LogoWithText';

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
                <LogoWithText />
            </Link>

            {/* the form */}
            <form className='px-3 w-96 max-w-full sm:px-0 sm:w-96 mx-auto mt-10 flex-grow'>
                <h1 className='transition-all duration-300 ease-in-out text-3xl md:text-4xl font-semibold text-center mb-4 text-neutral-900 dark:text-zinc-50'>Sign up</h1>

                {/* full name field */}
                <div className='w-full my-4'>
                    <label htmlFor="fullName" className='transition-colors duration-300 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Full name</label>
                    <div className='relative'>
                        <input
                            type="text"
                            id="fullName"
                            placeholder='Jhon Doe'
                            className='transition-colors duration-300 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                        />
                        <User className='size-5 md:size-6 transition-colors duration-300 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                </div>

                {/* username field */}
                <div className='w-full my-4'>
                    <label htmlFor="user" className='transition-colors duration-300 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Username</label>
                    <div className='relative'>
                        <input
                            type="email"
                            id="user"
                            placeholder='DJhon'
                            className='transition-colors duration-300 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                        />
                        <AtSign className='size-5 md:size-6 transition-colors duration-300 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                </div>

                {/* email field */}
                <div className='w-full my-4'>
                    <label htmlFor="email" className='transition-colors duration-300 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Email</label>
                    <div className='relative'>
                        <input
                            type="email"
                            id="email"
                            placeholder='jhondoe@example.com'
                            className='transition-colors duration-300 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                        />
                        <Mail className='size-5 md:size-6 transition-colors duration-300 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                </div>

                {/* password field */}
                <div className='w-full my-4'>
                    <label htmlFor="password" className='transition-colors duration-300 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Password</label>
                    <div className='relative'>
                        <input
                            ref={passwordInputRef}
                            type="password"
                            id="password"
                            placeholder='******'
                            className='transition-colors duration-300 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                        />
                        <LockIcon className='size-5 md:size-6 transition-colors duration-300 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                        <button type='button' onClick={handlePassowrdClick} className='absolute top-2 md:top-3 right-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1'>
                            {
                                isEyeOpen
                                    ?
                                    <Eye className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
                                    :
                                    <EyeOff className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
                            }
                        </button>
                    </div>
                </div>

                {/* password confirmation field */}
                <div className='w-full my-4'>
                    <label htmlFor="confirmPassword" className='transition-colors duration-300 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Confirm password</label>
                    <div className='relative'>
                        <input
                            ref={confirmPasswordInputRef}
                            type="password"
                            id="confirmPassword"
                            placeholder='******'
                            className='transition-colors duration-300 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                        />
                        <LockIcon className='size-5 md:size-6 transition-colors duration-300 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                        <button type='button' onClick={handleConfirmPassowrdClick} className='absolute top-2 md:top-3 right-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1'>
                            {
                                isOtherEyeOpen
                                    ?
                                    <Eye className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
                                    :
                                    <EyeOff className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
                            }
                        </button>
                    </div>
                </div>

                <div className='mt-10'>
                    <input
                        type="submit"
                        value="Sign up"
                        className='w-full transition-colors duration-300 ease-in-out bg-purple-500 hover:bg-purple-400 dark:bg-purple-700 dark:hover:bg-purple-600 text-zinc-100 py-2 px-8 md:px-12 font-bold rounded-xl cursor-pointer'
                    />
                </div>

                <hr className='transition-colors duration-300 ease-in-out border-slate-300 dark:border-slate-800 my-5' />
                <p className='transition-colors duration-300 ease-in-out text-center text-slate-600 dark:text-slate-400'>Already have an account?<Link to="/login" className='transition-colors duration-300 ease-in-out text-zinc-950 dark:text-slate-50 underline hover:no-underline ps-2'>Sing in</Link></p>
            </form>

            {/* footer */}
            <div className='text-slate-500 text-sm text-center w-full pb-3 mt-20'>
                Radfi Abdallah © 2024 | All rights reserved.
            </div>
        </div>
    )
}

export default Signup