import React from 'react'

function PostTag({ tag }) {
    return (
        // <p className='transition-colors ease-in-out duration-500 text-zinc-500 dark:text-zinc-300 border border-zinc-500 dark:border-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-1 px-2 rounded-lg'>
        <p className='transition-colors ease-in-out duration-500 text-zinc-800 dark:text-zinc-200 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 py-1 px-2 rounded-lg'>
            {tag}
        </p>
    )
}

export default PostTag