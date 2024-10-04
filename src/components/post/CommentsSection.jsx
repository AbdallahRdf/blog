import React from 'react'
import CommentBox from './CommentBox'
import CommentFrom from './CommentFrom';

function CommentsSection() {

    return (
        <div className='mt-8 border-t border-slate-700'>
            <p className='mt-5 mb-8 text-3xl'>Comments (1K)</p>

            <CommentFrom />

            <CommentBox />
            <CommentBox />
            <CommentBox />
            <CommentBox />
        </div>
    )
}

export default CommentsSection