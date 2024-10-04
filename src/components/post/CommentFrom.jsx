import React, { useRef } from 'react'
import { CircleUserRound } from 'lucide-react'

function CommentFrom() {

    const textareaRef = useRef(null);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    return (
        <form action="#">
            <div className='flex items-center gap-3 mb-2'>
                <button><CircleUserRound size={48} /></button>
                <textarea
                    ref={textareaRef}
                    onChange={handleInput}
                    className='resize-none text-lg bg-transparent border-b border-slate-400 focus:border-b-2 focus:border-slate-50 w-full focus:outline-none'
                    rows={1}
                    placeholder='Write a comment...'
                ></textarea>
            </div>
            <div className='flex justify-end gap-2'>
                <button className='py-2 px-5 text-lg hover:bg-slate-700 rounded-full'>Cancel</button>
                <input type='submit' value="Comment" className='py-2 px-3 text-lg bg-fuchsia-700 rounded-full cursor-pointer' />
            </div>
        </form>
    )
}

export default CommentFrom