import React from 'react'

function PostTitle({ children }) {
  return (
    <h1 className='text-4xl md:text-6xl font-bold text-zinc-800 dark:text-zinc-50'>{children}</h1>
  )
}

export default PostTitle