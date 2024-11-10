import React from 'react'

function PostTag({ tag }) {
    return (
        <a href='/' className='transition-colors duration-500 text-purple-600 dark:text-purple-400 hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-lg'>#{tag}</a>
    )
}

export default PostTag