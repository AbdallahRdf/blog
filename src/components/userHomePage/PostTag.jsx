import React from 'react'

function PostTag({children}) {
    return (
        <p className='text-slate-400 border border-slate-700 hover:bg-slate-800 p-1 rounded-lg'>{children}</p>
    )
}

export default PostTag