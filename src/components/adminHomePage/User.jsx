import React from 'react'
import userAvatar from '../../assets/img/user-avatar.svg'

function User() {
    return (
        <li className='flex gap-2 items-center px-3 py-4 hover:bg-zinc-800'>
            <img src={userAvatar} alt="user avatar" className='border rounded-xl size-10 sm:size-fit' />
            <div>
                <p className='text-base sm:text-xl font-semibold'>Jhon Does <span className='text-base sm:text-lg font-normal'>@jhoD</span></p>
                <p className='text-xs sm:text-sm'>joined on feb 13, 2024</p>
            </div>
        </li>
    )
}

export default User