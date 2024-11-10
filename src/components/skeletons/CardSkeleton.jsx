import { Image } from 'lucide-react'
import React from 'react'

function CardSkeleton() {

    return (
        <div className='bg-zinc-100 dark:bg-zinc-900 p-3 pb-2 rounded-2xl transition-colors ease-in-out duration-500 flex flex-col gap-3 sm:gap-4'>
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-8 rounded-2xl'></div> {/* h3 */}
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-5 sm:h-4 rounded-2xl'></div> {/* tags */}
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-3 sm:h-2 rounded-2xl'></div> {/* date */}
            <div className='pb-7/12 sm:pb-2/3 relative'>
                <div className='transition-colors ease-in-out duration-500 animate-pulse w-full h-full absolute object-cover  bg-gray-300 dark:bg-gray-700 rounded-2xl flex justify-center items-center'>
                    <Image className='transition-colors ease-in-out duration-500 text-gray-100 dark:text-zinc-900 size-28' />
                </div>
            </div>
            <div className='transition-colors ease-in-out duration-500 animate-pulse bg-gray-300 dark:bg-gray-700 h-6 sm:h-7 rounded-2xl'></div> {/* interaction bar */}
        </div>
    )
}

export default CardSkeleton