import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, BookmarkCheck, LogOut, Pencil, Search, UserRound } from 'lucide-react'
import logo from '../assets/img/logo.svg'
import userAvatar from '../assets/img/user-avatar.svg'
import { AnimatePresence, motion } from 'framer-motion'

function Navbar({ handleSearchClick }) {

    const [showDropDown, setShowDropDown] = useState(false);
    const UserAvatarBtnRef = useRef(null);

    const handleClick = (e) => {
        e.stopPropagation();
        setShowDropDown(prev => !prev);
    }

    useEffect(() => { 
        const handleWindowClick = (e) => {
            if(showDropDown && UserAvatarBtnRef.current && e.target !== UserAvatarBtnRef.current){
                console.log("done")
                setShowDropDown(false);
            }
        }
        
        window.addEventListener("click", handleWindowClick);
        return () => window.removeEventListener("click", handleWindowClick);
    }, [showDropDown])

    return (
        <>
            <nav className='fixed top-4 w-full xl:w-[1280px] rounded-xl mx-auto z-50'>
                <div className='backdrop-blur-2xl brightness-150 z-40 absolute inset-0 rounded-xl'></div>
                <ul className='rounded-xl px-4 py-1 sm:py-3 flex items-center gap-3 sm:gap-6 relative z-50'>
                    <li className='grow'>
                        <Link to="/">
                            <img src={logo} alt="Logo" className='inline size-10 md:size-14' />
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleSearchClick} className='hover:scale-110 hover:underline transition-all ease-in-out py-3 rounded-lg text-sm md:text-lg font-semibold flex items-center gap-2'>
                            <Search className='inline size-4 sm:size-6' /> Search
                        </button>
                    </li>
                    {
                        (true)
                            ?
                            <>
                                <li>
                                    <button className='rounded-full p-2'><Bell className='hover:fill-white' /></button>
                                </li>
                                <li>
                                    <button ref={UserAvatarBtnRef} onClick={handleClick}>
                                        <img src={userAvatar} alt="user avatar" className='size-7 sm:size-8' />
                                    </button>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/login" className='bg-white text-slate-900 hover:bg-transparent hover:text-slate-50 transition-colors ease-in-out py-2 px-5 md:py-4 md:px-6 rounded-lg border-2 text-base font-semibold'>
                                    LogIn
                                </Link>
                            </li>
                    }
                </ul>

                <AnimatePresence>
                    {
                        showDropDown
                        &&
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className='bg-zinc-900 text-gray-400 border border-zinc-700 rounded-2xl w-60 pt-4 flex flex-col overflow-hidden absolute right-2'
                        >
                            <div className='ps-3 pb-2'>
                                <img src={userAvatar} alt="user avatar" className='size-12 sm:size-16 border rounded-xl mb-2' />
                                <p className='text-lg sm:text-xl font-semibold'>Abdallah Radfi</p>
                                <p className='text-base sm:text-lg'>@radfi</p>
                            </div>
                            <Link to="/profile" className='ps-3 py-3 flex items-center gap-2 text-lg border-t border-zinc-600 hover:bg-zinc-800 hover:text-white'>
                                <UserRound className='inline size-6' /> Profile
                            </Link >
                            <Link to="/saved" className='ps-3 py-3 flex items-center gap-2 text-lg border-t border-zinc-600 hover:bg-zinc-800 hover:text-white'>
                                <BookmarkCheck className='inline size-6' /> Saved posts
                            </Link >
                            <Link to="/posts/new" className='ps-3 py-3 flex items-center gap-2 text-lg border-t border-zinc-600 hover:bg-zinc-800 hover:text-white'>
                                <Pencil className='inline size-6' /> Create new post
                            </Link >
                            <Link to="/logout" className='ps-3 py-3 flex items-center gap-2 text-lg border-t border-zinc-600 hover:bg-zinc-800 hover:text-white'>
                                <LogOut className='inline size-6' /> Log out
                            </Link>
                        </motion.div>
                    }
                </AnimatePresence>
            </nav>

        </>
    )
}

export default Navbar