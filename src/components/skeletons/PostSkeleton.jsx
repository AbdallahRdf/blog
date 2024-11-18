import { Image } from 'lucide-react'
import React from 'react'
import PostSideMenuSkeleton from './PostSideMenuSkeleton'

function PostSkeleton() {
    return (
        <div className='w-full xl:w-[1280px] mx-auto pt-32 pb-24 px-2 scroll-smooth'>
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-12 rounded-2xl'></div> {/* title */}
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-5 w-56 rounded-2xl my-8'></div> {/* date */}

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>

                    <div className='pb-3/6 relative mb-6'>
                        <div className='transition-colors ease-in-out duration-500 animate-pulse w-full h-full absolute object-cover  bg-gray-300 dark:bg-gray-700 rounded-2xl flex justify-center items-center'>
                            <Image className='transition-colors ease-in-out duration-500 text-gray-100 dark:text-zinc-900 size-28' />
                        </div>
                    </div>
                    <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-8 rounded-2xl  py-1 sm:py-2 base:py-3'></div> {/* interaction bar */}
                    <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-16 rounded-2xl py-2 mt-6'></div> {/* post description */}
                    <PostSideMenuSkeleton isItOnTheSide={false} />
                </div>
                <PostSideMenuSkeleton />
            </div>
        </div>
    )
}

export default PostSkeleton