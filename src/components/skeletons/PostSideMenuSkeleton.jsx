import React from 'react'

function PostSideMenuSkeleton({ isItOnTheSide = true }) {
    return (
        <div className={`${isItOnTheSide ? 'hidden lg:flex lg:gap-y-6 lg:flex-col lg:w-80' : 'flex flex-col gap-y-6 min-w-80 lg:hidden mt-6'}`}>

            <div className='bg-zinc-100 dark:bg-zinc-900 p-3 pb-2 rounded-2xl transition-colors ease-in-out duration-500'>
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl mb-2'></div> {/* author */}
                <div className='flex flex-col gap-2'>
                    <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-12 rounded-2xl'></div> {/* user avatar */}
                    <div className='transition-colors duration-500 text-zinc-800 dark:text-zinc-100 flex gap-2 flex-col'>
                        <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl'></div> {/* author */}
                    </div>
                </div>
            </div>

            <div className='bg-zinc-100 dark:bg-zinc-900 transition-colors duration-500 ease-in-out p-2 rounded-xl'>
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-16 rounded-2xl my-2'></div> {/* tags */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* tag */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* tag */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* tag */}
            </div>

            <div className='bg-zinc-100 dark:bg-zinc-900 transition-colors duration-500 ease-in-out p-2 rounded-xl text-zinc-800 dark:text-zinc-100'>
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-16 rounded-2xl'></div> {/* table of content */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* header */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* header */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* header */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* header */}
                <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded-2xl my-2'></div> {/* header */}
            </div>
        </div>
    )
}

export default PostSideMenuSkeleton