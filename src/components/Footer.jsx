import React, { useContext } from 'react'
import githubLogo from '../assets/img/github-logo.svg'
import githubLogoDark from '../assets/img/github-logo-dark.svg'
import linkedinLogo from '../assets/img/linkedin-logo.svg'
import linkedinLogoDark from '../assets/img/linkedin-logo-dark.svg'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/contexts'
import LogoWithText from './LogoWithText'

function Footer() {    

    const { isDarkMode } = useContext(ThemeContext);

    return (
        <footer className="border-t border-t-purple-600 dark:border-t-purple-400 mt-8 sm:mt-12 pt-8 sm:pt-16 pb-6 px-9">
            <div className='mx-auto w-full xl:w-[1230px]'>

                <Link to="/" className='flex items-center'>
                    <LogoWithText />
                </Link>
                <div className="flex justify-center sm:justify-between flex-wrap gap-5 my-6">
                    <p className='text-neutral-800 dark:text-slate-300 text-base text-center sm:text-start sm:text-lg'><q>Learning and Growing One Line of Code at a Time.</q> <br /> Have feedback or ideas? Get in touch.</p>
                    <div className='flex gap-5'>
                        <a href='https://github.com/AbdallahRdf' target='_blank'>
                            <img className='hover:scale-125 transition-all ease-in-out' src={isDarkMode ? githubLogo : githubLogoDark} alt="github logo" />
                        </a>
                        <a href='https://www.linkedin.com/in/abdallah-radfi' target='_blank'>
                            <img className='hover:scale-125 transition-transform ease-in-out' src={isDarkMode ? linkedinLogo : linkedinLogoDark} alt="github logo" />
                        </a>
                        <a href="">
                        </a>
                    </div>
                </div>
                <p className='text-xs sm:text-sm text-center md:text-start md:text-base text-neutral-700 dark:text-slate-400'>Radfi Abdallah &copy; 2024 | All rights reserved.</p>
            </div>
        </footer >
    )
}

export default Footer