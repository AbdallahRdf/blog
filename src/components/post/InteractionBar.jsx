import React from 'react'
import { Bookmark, Link, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'

function InteractionBar() {
    return (
        <div className='transition-colors duration-500 ease-in-out flex justify-around border-y border-slate-300 dark:border-slate-700 py-1 sm:py-2 base:py-3 px-2'>

            <button title="Like" className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-500 dark:text-slate-100 hover:text-blue-500 p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950'>
                <ThumbsUp className='inline size-5 md:size-6' />
                {/* <span className='md:text-xl'></span> */}
            </button>

            <button title="Dislike" className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-500 dark:text-slate-100 hover:text-rose-500 p-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950'>
                <ThumbsDown className='inline  size-5 md:size-6' />
                {/* <span className='md:text-xl'></span> */}
            </button>

            <a title="Comments" href='#commentSection' className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-500 dark:text-slate-100 hover:text-cyan-500 p-1 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-950'>
                <MessageCircle className='inline  size-5 md:size-6' />
                {/* <span className='md:text-xl'></span> */}
            </a>

            <button title='Save' className='transition-colors duration-500 ease-in-out text-slate-500 dark:text-slate-100 hover:text-orange-500 p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-950'>
                <Bookmark className='size-5 md:size-6'/>
            </button>

            <button title='Copy link' className='transition-colors duration-500 ease-in-out hidden md:block text-slate-500 dark:text-slate-300 hover:text-purple-500 p-1 rounded-md hover:bg-purple-100 dark:hover:bg-purple-950'>
                <Link className='size-5 sm:size-6'/>
            </button>
        </div>
    )
}

export default InteractionBar