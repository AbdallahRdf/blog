import React from 'react'

function PostDescription({ description }) {
  return (
    <p className='transition-colors duration-500 ease-in-out text-sm sm:text-lg text-slate-700 dark:text-slate-300 border-s-2 border-purple-500 rounded-lg py-2 ps-2 mt-6 bg-zinc-100 dark:bg-zinc-800'>
        {description}
    </p>
  )
}

export default PostDescription