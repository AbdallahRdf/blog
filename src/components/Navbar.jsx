import React from 'react'
import { Link } from 'react-router-dom'
import { Bell, CircleUserRound, Search } from 'lucide-react'
import logo from '../assets/img/logo.svg'
import userAvatar from '../assets/img/user-circle-svgrepo-com.svg'

function Navbar() {
    return (
        <nav className='fixed top-4 w-full xl:w-[1280px] rounded-xl mx-auto z-50'>
            <div className='backdrop-blur-2xl brightness-150 z-40 absolute inset-0 rounded-xl'></div>
            <ul className='rounded-xl px-4 py-1 sm:py-3 flex items-center gap-3 sm:gap-6 relative z-50'>
                <li className='grow'>
                    <Link to="/">
                        <img src={logo} alt="Logo" className='inline size-10 md:size-14' />
                    </Link>
                </li>
                <li>
                    <button className='hover:scale-110 hover:underline transition-all ease-in-out py-3 rounded-lg text-sm md:text-lg font-semibold flex items-center gap-2'>
                        <Search className='inline size-4 sm:size-6' /> Search
                    </button>
                </li>
                {
                    (false) 
                    ?
                    <>
                        <li>
                            <button className='rounded-full p-2'><Bell className='hover:fill-white'/></button>
                        </li>
                        <li>
                            <button>
                                <img src={userAvatar} alt="user avatar" className='size-7 sm:size-8' />
                            </button>
                        </li>
                    </>
                    :
                    <li>
                        <Link to="/login" className='bg-white text-slate-900 hover:bg-transparent hover:text-slate-50 transition-colors ease-in-out py-2 px-5 md:py-4 md:px-6 rounded-lg border-2 text-md font-semibold'>
                            LogIn
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Navbar