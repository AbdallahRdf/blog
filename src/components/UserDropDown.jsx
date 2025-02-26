import React, { useContext } from 'react'
import { BookmarkCheck, ChartNoAxesCombined, LogOut, Pencil, User, UserRound, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/contexts';
import useCustomAxios from '../hooks/useCustomAxios';
import userRoles from '../enums/userRoles';


function UserDropDown() {

    const customAxios = useCustomAxios();

    const { user, setUser, setAccessToken } = useContext(AuthContext);

    const navigator = useNavigate();

    const logout = async () => {
        try {
            await customAxios.post('/auth/logout');
        } catch (error) {
            if (error.response?.status >= 500) {
                navigator(`/internal-server-error`, {
                    state: {
                        statusCode: error.response?.status || 500,
                        message: "Server Error"
                    }
                })
            }
        }
        setAccessToken(null);
        setUser(null);
        location.href = '/';
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='transition-all duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-zinc-300 dark:border-zinc-700 rounded-2xl w-52 sm:w-60 pt-4 flex flex-col overflow-hidden absolute right-2'
        >
            <div className='ps-3 pb-2'>
                {
                    user?.profileCover
                        ?
                        <User className='size-12 sm:size-16 border rounded-xl mb-2' />
                        /* <img src={userAvatar} alt="user avatar" className='size-12 sm:size-16 border rounded-xl mb-2' /> */
                        :
                        <User className='size-12 sm:size-16 border rounded-xl mb-2' />
                }
                <p className='text-lg sm:text-xl font-semibold'>{user?.fullName}</p>
                <p className='text-base sm:text-lg'>{user?.username}</p>
            </div>

            {
                (user?.role === userRoles.ADMIN || user?.role === userRoles.MODERATOR) // if admin or moderator
                &&
                <>
                    <Link
                        to="/dashboard"
                        className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
                    >
                        <ChartNoAxesCombined className='inline size-5 sm:size-6' /> Dashboard
                    </Link >
                    <Link
                        to="/posts/new"
                        className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
                    >
                        <Pencil className='inline size-5 sm:size-6' /> Create new post
                    </Link >
                </>
            }

            <Link
                to="/profile"
                className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <UserRound className='inline size-5 sm:size-6' /> Profile
            </Link >

            {
                (user?.role === userRoles.ADMIN || user?.role === userRoles.MODERATOR) // if admin or moderator
                &&
                <>
                    <Link
                        to="/posts/new"
                        className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
                    >
                        <Users className='inline size-5 sm:size-6' /> Users
                    </Link >
                </>
            }

            <Link
                to="/saved"
                className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <BookmarkCheck className='inline size-5 sm:size-6' /> Saved posts
            </Link >

            <button
                onClick={logout}
                className='transition-all duration-500 ease-in-out ps-3 py-3 flex items-center gap-2 text-base sm:text-lg border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
            >
                <LogOut className='inline size-5 sm:size-6' /> Log out
            </button>
        </motion.div>
    )
}

export default UserDropDown