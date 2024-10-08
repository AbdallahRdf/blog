import React from 'react'
import githubLogo from '../assets/img/github-logo.svg'
import linkedinLogo from '../assets/img/linkedin-logo.svg'
import logo from '../assets/img/logo.svg'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="border-t border-t-purple-400 mt-12 pt-8 sm:pt-16 pb-6 px-9 flex-none">
            <div className='xl:w-8/12 mx-auto '>
                <Link to="/" className='flex items-center'>
                    <img className='inline' src={logo} alt="Logo" /> <span className='text-4xl'>Blog</span>
                </Link>
                <div className="flex justify-center sm:justify-between flex-wrap gap-5 my-6">
                    <p className='text-slate-300 text-md text-center sm:text-start sm:text-lg'><q>Learning and Growing One Line of Code at a Time.</q> <br /> Have feedback or ideas? Get in touch.</p>
                    <div className='flex gap-5'>
                        <a href='https://github.com/AbdallahRdf' target='_blank'>
                            <img className='hover:scale-125 transition-all ease-in-out' src={githubLogo} alt="github logo" />
                        </a>
                        <a href='https://www.linkedin.com/in/abdallah-radfi' target='_blank'>
                            <img className='hover:scale-125 transition-transform ease-in-out' src={linkedinLogo} alt="github logo" />
                        </a>
                        <a href="">
                        </a>
                    </div>
                </div>
                <p className='text-sm text-center sm:text-start md:text-md text-slate-400'>Radfi Abdallah &copy; 2024 | All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer