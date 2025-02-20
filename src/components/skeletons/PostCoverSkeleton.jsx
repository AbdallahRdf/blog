import { Image } from 'lucide-react'
import React from 'react'

function PostCoverSkeleton() {
    return (
        <div title='Loading...' className='transition-colors ease-in-out duration-500 animate-pulse w-full h-full absolute object-cover  bg-gray-200 dark:bg-gray-800 rounded-2xl flex justify-center items-center cursor-wait'>
            < Image className='transition-colors ease-in-out duration-500 text-zinc-50 dark:text-zinc-950 size-28' />
        </div >
    )
}

export default PostCoverSkeleton