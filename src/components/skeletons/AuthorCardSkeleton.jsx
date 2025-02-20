import { Image } from 'lucide-react'
import React from 'react'

function AuthorCardSkeleton() {
    return (
        <div title='Loading...' className='transition-colors ease-in-out duration-500 animate-pulse size-12 bg-gray-200 dark:bg-gray-800 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 flex justify-center items-center cursor-wait'>
            < Image className='transition-colors ease-in-out duration-500 text-zinc-50 dark:text-zinc-950 size-28' />
        </div >
    )
}

export default AuthorCardSkeleton