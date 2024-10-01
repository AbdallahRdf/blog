import React from 'react'
import { Link } from 'react-router-dom'
import { Bell, CircleUserRound, Search } from 'lucide-react'
import logo from '../assets/logo.svg'

function Navbar() {
    return (
        <nav className='fixed top-4 w-full lg:w-8/12 rounded-xl mx-auto'>
            <div className='backdrop-blur-2xl brightness-150 -z-10 absolute inset-0 rounded-xl'></div>
            <ul className='rounded-xl px-4 py-3 flex items-center gap-4'>
                <li className='grow'>
                    <Link to="/">
                        <img src={logo} alt="Logo" className='inline' />
                    </Link>
                </li>
                <li>
                    <button className='hover:scale-110 hover:underline transition-all ease-in-out py-3 px-4 rounded-lg text-md font-semibold flex items-center gap-2'>
                        <Search className='inline' /> Search
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
                            <button><CircleUserRound size={32} /></button>
                        </li>
                    </>
                    :
                    <li>
                        <Link to="/login" className='bg-white text-slate-900 hover:bg-transparent hover:text-slate-50 transition-colors ease-in-out delay-75 py-4 px-6 rounded-lg border-2 text-md font-semibold'>
                            LogIn
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Navbar