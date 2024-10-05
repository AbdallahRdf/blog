import { ChevronDown, ChevronUp, CircleUserIcon, EllipsisVertical, ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import ReplyBox from './ReplyBox';
import userAvatar from '../../assets/img/user-circle-svgrepo-com.svg'

function CommentBox() {
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);

    const handleRepliesBtnClikc = () => setIsRepliesOpen(prev => !prev);

    return (
        <div className='relative flex items-start gap-3 my-6 '>
            {/* <button><CircleUserIcon size={48} /></button> */}
            {/* <button> */}
                <img src={userAvatar} alt="user avatar" className='size-10 md:size-12' />
            {/* </button> */}
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
                <button onClick={handleRepliesBtnClikc} className='flex text-blue-400 mt-2 gap-3 hover:bg-slate-800 rounded-full py-2 px-4'>
                    {
                        isRepliesOpen
                        ?
                        <ChevronUp />
                        :
                        <ChevronDown />
                    }
                    <span>3 Replies</span>
                </button>

                <div className={`${isRepliesOpen ? "block" : "hidden"} -ms-8 sm:m-0`}>
                    <ReplyBox />
                    <ReplyBox />
                    <ReplyBox />
                </div>
            </div>

            <button className='hover:bg-slate-800 rounded-full p-2'>
                <EllipsisVertical className="inline" />
            </button>
        </div>
    )
}

export default CommentBox