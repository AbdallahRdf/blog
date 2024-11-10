import React, { useContext } from 'react'
import logo from '../assets/img/logo.svg'
import darkLogo from '../assets/img/logo-dark.svg'
import { ThemeContext } from '../context/contexts';

function LogoWithText() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <>
            <img src={isDarkMode ? logo : darkLogo} alt="Logo" />
            <span className='transition-colors duration-500 ease-in-out text-4xl font-bold text-neutral-900 dark:text-zinc-50'>Blog</span>
        </>
    )
}

export default LogoWithText