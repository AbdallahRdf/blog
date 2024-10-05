import React from 'react'

function PostTag({children}) {
    return (
        <a href='/' className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg'>{children}</a>
    )
}

export default PostTag