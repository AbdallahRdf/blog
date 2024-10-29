import React from 'react'
import { Bookmark, Link, MessageCircle, MessageSquareText, ThumbsDown, ThumbsUp } from 'lucide-react'

function InteractionBar() {
    return (
        <div className='flex justify-around mt-3'>

            <button title="Like" className='flex gap-x-2 items-center text-slate-300 hover:text-blue-500 p-1 rounded-md hover:bg-blue-950'>
                <ThumbsUp className='inline size-5 sm:size-6' />
                <span className='text-base font-semibold'>23</span>
            </button>

            <button title='Dislike' className='flex gap-x-2 items-center text-slate-300 hover:text-rose-500 p-1 rounded-md hover:bg-rose-950'>
                <ThumbsDown className='inline size-5 sm:size-6' />
                <span className='text-base font-semibold'></span>
            </button>

            <a title='Comments' href='#commentSection' className='flex gap-x-2 items-center text-slate-300 hover:text-cyan-500 p-1 rounded-md hover:bg-cyan-950'>
                <MessageSquareText className='inline  size-5 sm:size-6' />
                <span className='text-base font-semibold'>1</span>
            </a>

            <button title='Save' className='text-slate-300 hover:text-orange-500 p-1 rounded-md hover:bg-orange-950'>
                <Bookmark className='size-5 sm:size-6'/>
            </button>

            <button title='Copy link' className='text-slate-300 hover:text-purple-500 p-1 rounded-md hover:bg-purple-950'>
                <Link className='size-5 sm:size-6'/>
            </button>
        </div>
    )
}

export default InteractionBar