import React from 'react'

function PostTag({ tag }) {
    return (
        <a href='/' className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg'>#{tag}</a>
    )
}

export default PostTag