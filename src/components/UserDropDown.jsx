import React, { useContext } from 'react'
import { BookmarkCheck, LogOut, Pencil, User, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/contexts';
import customAxios from '../axios/customAxios';


function UserDropDown() {

    const { user, setUser, setAccessToken } = useContext(AuthContext);

    const navigator = useNavigate();

    const logout = async () => {
        try {
            await customAxios.post('/auth/logout');
            setAccessToken(null);
            setUser(null);
            navigator('/');
        } catch (error) {
            let message = "Server Error";
            if (error.response.status < 500) {
                message = error.response.data.message;
            }
            navigator(`/${message.split(' ').join('-')}`, {
                state: {
                    statusCode: error.response.status,
                    message
                }
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='bg-zinc-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-400 border border-zinc-300 dark:border-zinc-700 rounded-2xl w-52 sm:w-60 pt-4 flex flex-col overflow-hidden absolute right-2'
        >
            <div className='ps-3 pb-2'>
                {
                    user.profileCover
                        ?
                        <User className='size-12 sm:size-16 border rounded-xl mb-2' />
                        /* <img src={userAvatar} alt="user avatar" className='size-12 sm:size-16 border rounded-xl mb-2' /> */
                        :
                        <User className='size-12 sm:size-16 border rounded-xl mb-2' />
                }
                <p className='text-lg sm:text-xl font-semibold'>{user.fullName}</p>
                <p className='text-base sm:text-lg'>{user.username}</p>
            </div>

            <Link
                to="/profile"
                className='ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <UserRound className='inline size-5 sm:size-6' /> Profile
            </Link >

            <Link
                to="/saved"
                className='ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <BookmarkCheck className='inline size-5 sm:size-6' /> Saved posts
            </Link >

            <Link
                to="/posts/new"
                className='ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <Pencil className='inline size-5 sm:size-6' /> Create new post
            </Link >

            <button
                onClick={logout}
                className='ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <LogOut className='inline size-5 sm:size-6' /> Log out
            </button>
        </motion.div>
    )
}

export default UserDropDown