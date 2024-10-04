import { CircleUserIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'

function ReplyBox() {
    return (
        <div className='flex items-start gap-3 my-6'>
            <button><CircleUserIcon size={40} /></button>
            <div>
                <p className='font-semibold text-lg mb-2'>@Username <span className='font-normal ps-2 text-md'>2days ago</span></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores inventore repudiandae quae quam amet?</p>
                <div className='flex gap-5 mt-3'>
                    <button className='flex gap-x-2 items-center text-slate-100 hover:text-blue-500'>
                        <ThumbsUp size={18} className='inline' />
                        <span className='text-md'>234K</span>
                    </button>
                    <button className='flex gap-x-2 items-center text-slate-100 hover:text-blue-500'>
                        <ThumbsDown size={18} className='inline' />
                        <span className='text-md'>1.2k</span>
                    </button>
                    <button className='hover:bg-slate-800 rounded-full px-3 py-1'>Reply</button>
                </div>
            </div>
        </div>
    )
}

export default ReplyBox