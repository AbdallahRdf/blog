import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AdminHomePage() {
    return (
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 gap-6'>
            <motion.div
                initial={{ opacity: 0, y: -100}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3}}
            >
                <Link to="/users?role=admin" className='bg-transparent border border-zinc-500 hover:bg-lime-400 shadow-lg hover:lime-cyan-400/50 transition-all duration-500 cursor-pointer  rounded-xl flex flex-col justify-center items-center h-32 md:h-44'>
                    <span className='text-lg sm:text-2xl font-normal'>Admins</span>
                    <span className='text-4xl sm:text-6xl font-bold'>1</span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -100}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1}}
            >
                <Link to="/users?role=moderator" className='bg-transparent border border-zinc-500 hover:bg-cyan-400 shadow-lg hover:shadow-cyan-400/50 transition-all duration-500 cursor-pointer rounded-xl flex flex-col justify-center items-center h-32 md:h-44'>
                    <span className='text-lg sm:text-2xl font-normal'>Moderators</span>
                    <span className='text-4xl sm:text-6xl font-bold'>3</span>
                </Link>
            </motion.div>

           <motion.div
                initial={{ opacity: 0, y: -100}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2}}
           >
            <Link to="/users?role=user" className='bg-transparent border border-zinc-500 hover:bg-rose-400 shadow-lg hover:shadow-rose-400/50 transition-all duration-500 cursor-pointer  rounded-xl flex flex-col justify-center items-center h-32 md:h-44'>
                    <span className='text-lg sm:text-2xl font-normal'>Users</span>
                    <span className='text-4xl sm:text-6xl font-bold'>10</span>
                </Link>
           </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -100}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3}}
            >
                <Link to="/posts" className='bg-transparent border border-zinc-500 hover:bg-fuchsia-400 shadow-lg hover:shadow-fuchsia-400/50 transition-all duration-500 cursor-pointer rounded-xl flex flex-col justify-center items-center h-32 md:h-44'>
                    <span className='text-lg sm:text-2xl font-normal'>Articles</span>
                    <span className='text-4xl sm:text-6xl font-bold'>9</span>
                </Link>
            </motion.div>
        </div>
    )
}

export default AdminHomePage