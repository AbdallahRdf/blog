import { ThumbsDown } from 'lucide-react'
import React from 'react'
import { formatNumber } from '../../utils/formatter'

function DislikeButton({ handleDislikeClick, dislikesCount, isDisliked, iconClassName, countClassName }) {
    return (
        <button
            title='Dislike'
            onClick={handleDislikeClick}
            className={`transition-colors duration-500 ease-in-out flex gap-x-2 items-center ${isDisliked ? 'text-rose-600 dark:text-rose-500 bg-rose-100 dark:bg-rose-950' : 'text-neutral-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950'} p-1 rounded-md`}>
            <ThumbsDown className={iconClassName} />
            {
                dislikesCount !== 0
                &&
                <span className={countClassName}>{formatNumber(dislikesCount)}</span>
            }
        </button>
    )
}

export default DislikeButton