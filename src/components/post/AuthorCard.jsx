import { User } from 'lucide-react'
import React from 'react'
import useFetchImage from '../../hooks/useFetchImage'
import AuthorCardSkeleton from '../skeletons/AuthorCardSkeleton';

function AuthorCard({ author }) {

    const { image: profileImage, isFetching } = useFetchImage(author.profileImage);
    return (
        <div className='transition-colors duration-500 ease-in-out p-4 rounded-xl border border-slate-400 dark:border-slate-700'>
            <p className='transition-colors duration-500 text-sm text-slate-600 dark:text-slate-400 mb-2'>Author</p>
            <div className='flex items-center flex-wrap gap-x-2'>
                {
                    isFetching
                        ?
                        <AuthorCardSkeleton />
                        :
                        profileImage
                            ?
                            <img src={profileImage} className='size-12 rounded-lg' />
                            :
                            <User className='transition-colors duration-500 size-12 text-zinc-600 dark:text-zinc-300 border-2 border-zinc-600 dark:border-zinc-300 rounded-lg' />
                }
                <div className='transition-colors duration-500 text-zinc-800 dark:text-zinc-100'>
                    <p className='text-lg font-semibold'>{author.fullName}</p>
                    <p className='text-base font-normal'>{author.username}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorCard