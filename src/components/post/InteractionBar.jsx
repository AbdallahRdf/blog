import React from 'react'
import { Bookmark, ExternalLink, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'

function InteractionBar() {
    return (
        <div className='flex justify-around border-y border-slate-700 py-3 px-2'>
            <button className='flex gap-x-2 items-center text-slate-100 hover:text-blue-500'>
                <ThumbsUp className='inline size-5 md:size-6' />
                <span className='md:text-xl'>234K</span>
            </button>
            <button className='flex gap-x-2 items-center text-slate-100 hover:text-blue-500'>
                <ThumbsDown className='inline  size-5 md:size-6' />
                <span className='md:text-xl'>1.2k</span>
            </button>
            <a href='#commentSection' className='flex gap-x-2 items-center text-slate-100 hover:text-rose-500'>
                <MessageCircle className='inline  size-5 md:size-6' />
                <span className='md:text-xl'>1K</span>
            </a>
            <button title='Save'>
                <Bookmark className='hover:fill-slate-50  size-5 md:size-6'/>
            </button>
        </div>
    )
}

export default InteractionBar