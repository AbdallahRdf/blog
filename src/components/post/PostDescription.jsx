import React from 'react'

function PostDescription({ description }) {
  return (
    <p className='text-sm sm:text-lg text-slate-300 border-s-2 border-purple-500 rounded-lg py-2 ps-2 mt-6 bg-zinc-800'>
        {description}
    </p>
  )
}

export default PostDescription