import { CircleUserRoundIcon, Ellipsis, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'

function ReplyBox() {
    return (
        <div className='relative flex items-start gap-1 my-6 ms-8 md:ms-12'>
            {/* user avatar */}
            <button className='mt-4'>
                <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-600 dark:text-zinc-200' />
            </button>

            {/* reply box */}
            <div className='transition-colors duration-500 ease-in-out flex-grow border border-zinc-200 dark:border-zinc-700 rounded-lg relative p-4'>
                <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-sm md:text-lg mb-2'>@Username <span className='font-normal ps-2 text-sm'>2days ago</span></p>
                <p className='transition-colors duration-500 ease-in-out text-sm md:text-lg text-zinc-800 dark:text-zinc-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores inventore repudiandae quae quam amet?</p>
                <div className='flex gap-5 mt-3'>
                    <button className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-900 dark:text-slate-100 hover:text-blue-500 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950'>
                        <ThumbsUp className='inline size-4 md:size-5' />
                        <span className='text-sm md:text-base'>234K</span>
                    </button>
                    <button className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-900 dark:text-slate-100 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950'>
                        <ThumbsDown className='inline size-4 md:size-5' />
                        <span className='text-sm md:text-base'>1.2k</span>
                    </button>
                    <button className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-200 rounded-xl p-1'>
                        <MessageCircle className='inline size-4 md:size-5' />
                    </button>
                </div>

                {/* options */}
                <button className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full p-1 m-1 absolute top-0 right-0'>
                    <Ellipsis className="size-4 md:size-5 inline" />
                </button>
            </div>
        </div>
    )
}

export default ReplyBox