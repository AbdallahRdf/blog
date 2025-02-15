import { ThumbsUp } from 'lucide-react'
import React from 'react'
import { formatNumber } from '../../utils/formatter'

function LikeButton({handleLikeClick, isLiked, likesCount, iconClassName, countClassName}) {
    return (
        <button
            title="Like"
            onClick={handleLikeClick}
            className={`transition-colors duration-500 ease-in-out flex gap-x-2 items-center ${isLiked ? 'text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-950' : 'text-neutral-600 dark:text-slate-300 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950'} p-1 rounded-md`}
        >
            <ThumbsUp className={iconClassName} />
            {
                likesCount !== 0
                &&
                <span className={countClassName}>{formatNumber(likesCount)}</span>
            }
        </button>
    )
}

export default LikeButton