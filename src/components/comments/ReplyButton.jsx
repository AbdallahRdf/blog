import { MessageCircle } from 'lucide-react'
import React from 'react'

function ReplyButton({ handleClick }) {
    return (
        <button
            onClick={handleClick}
            title='Reply'
            className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-200 rounded-xl p-1'
        >
            <MessageCircle className="inline size-4 md:size-5" />
        </button>
    )
}

export default ReplyButton