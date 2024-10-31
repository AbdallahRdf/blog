import React from 'react'

function PostTag({children}) {
    return (
        <p className='transition-colors ease-in-out duration-300 text-gray-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-lg'>{children}</p>
    )
}

export default PostTag