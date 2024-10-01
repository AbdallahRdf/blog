import React from 'react'
import githubLogo from '../assets/github-logo.svg'
import linkedinLogo from '../assets/linkedin-logo.svg'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="border-t border-t-fuchsia-400 mt-28 pt-16 pb-6 px-9 flex-none">
            <div className='xl:w-8/12 mx-auto '>
                <Link to="/" className='flex items-center'>
                    <img className='inline' src={logo} alt="Logo" /> <span className='text-4xl'>Blog</span>
                </Link>
                <div className="flex justify-between flex-wrap gap-5 my-6">
                    <p className='text-slate-300 text-lg'><q>Learning and Growing One Line of Code at a Time.</q> <br /> Have feedback or ideas? Get in touch.</p>
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
                <p className='text-md text-slate-400'>Radfi Abdallah &copy; 2024 | All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer