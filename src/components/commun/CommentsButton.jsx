import { MessageCircle } from 'lucide-react'
import React from 'react'
import { formatNumber } from '../../utils/formatter'

function CommentsButton({ comments, iconClassName, countClassName }) {
    return (
        <>
            <MessageCircle className={iconClassName} />
            {
                comments !== 0
                &&
                <span className={countClassName}>{formatNumber(comments)}</span>
            }
        </>
    )
}

export default CommentsButton