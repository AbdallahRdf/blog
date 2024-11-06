import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Moon, Search, Sun, User } from 'lucide-react'
import logo from '../assets/img/logo.svg'
import darkLogo from '../assets/img/logo-dark.svg'
import { AnimatePresence } from 'framer-motion'
import { AuthContext, ThemeContext } from '../context/contexts'
import UserDropDown from './UserDropDown'

function Navbar({ handleSearchClick }) {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { accessToken, user } = useContext(AuthContext);

    const [showDropDown, setShowDropDown] = useState(false);
    const UserAvatarBtnRef = useRef(null);

    const handleClick = (e) => {
        e.stopPropagation();
        setShowDropDown(prev => !prev);
    }

    useEffect(() => {
        const handleWindowClick = (e) => {
            if (showDropDown && UserAvatarBtnRef.current && e.target !== UserAvatarBtnRef.current) {
                setShowDropDown(false);
            }
        }

        window.addEventListener("click", handleWindowClick);
        return () => window.removeEventListener("click", handleWindowClick);
    }, [showDropDown])

    return (
        <>
            <nav className='transition-all duration-300 ease-in-out bg-zinc-50 fixed dark:bg-transparent top-4 w-full xl:w-[1280px] rounded-xl mx-auto z-50'>
                <div className='transition-all duration-300 ease-in-out dark:backdrop-blur-2xl dark:brightness-150 z-40 absolute inset-0 rounded-xl'></div>
                <ul className='rounded-xl px-4 py-1 sm:py-3 flex items-center gap-3 sm:gap-6 relative z-50'>

                    {/* Logo */}
                    <li className='grow'>
                        <Link to="/">
                            <img src={isDarkMode ? logo : darkLogo} alt="Logo" className='inline size-10 md:size-14' />
                        </Link>
                    </li>

                    {/* Search button */}
                    <li>
                        <button onClick={handleSearchClick} className='transition-all duration-300 ease-in-out hover:scale-110 hover:underline dark:text-zinc-50 py-3 rounded-lg text-sm md:text-lg font-semibold flex items-center gap-2'>
                            <Search className='inline size-4 sm:size-6' /> Search
                        </button>
                    </li>

                    {/* dark/light mode toggling button */}
                    <button
                        title={`toggle ${isDarkMode ? "light" : "dark"} mode`}
                        onClick={() => setIsDarkMode(prev => !prev)}
                        className='hover:bg-zinc-200 dark:hover:bg-transparent rounded-full p-1 hover:rotate-45 dark:hover:rotate-90 transition-transform duration-500'
                    >
                        {
                            isDarkMode
                                ?
                                <Sun className='size-6 sm:size-8 text-slate-50' />
                                :
                                <Moon className='size-6 sm:size-8 text-slate-900' />
                        }
                    </button>

                    {
                        (accessToken)
                            ?
                            <>
                                <li>
                                    <button className='transition-all duration-300 ease-in-out dark:hover:scale-125 hover:bg-zinc-200 dark:hover:bg-transparent rounded-full p-2 text-black dark:text-zinc-50'>
                                        <Bell className='hover:fill-black dark:hover:fill-white size-5 sm:size-6' />
                                    </button>
                                </li>
                                <li>
                                    <button ref={UserAvatarBtnRef} onClick={handleClick} className='transition-all duration-300 ease-in-out dark:hover:scale-125 hover:bg-zinc-200 dark:hover:bg-transparent rounded-full p-2 text-black dark:text-zinc-50'>
                                        {
                                            user?.profileImage
                                                ?
                                                <User className='size-6 sm:size-7' />
                                                // <img src={userAvatar} alt="user avatar" className='size-7 sm:size-8 fill-black' />
                                                :
                                                <User className='size-6 sm:size-7' />
                                        }
                                    </button>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/auth/login" className='transition-all duration-300 ease-in-out bg-white text-slate-900 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-800 dark:hover:border-zinc-50 dark:hover:bg-transparent dark:hover:text-slate-50  py-2 px-5 md:py-4 md:px-6 rounded-lg border-2 text-base font-semibold'>
                                    LogIn
                                </Link>
                            </li>
                    }
                </ul>

                <AnimatePresence>
                    {
                        showDropDown
                        &&
                        <UserDropDown />
                    }
                </AnimatePresence>
            </nav>

        </>
    )
}

export default Navbar