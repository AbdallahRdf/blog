import React from 'react'

function PostTitle({ children }) {
  return (
    <h1 className='text-4xl md:text-6xl font-bold'>{children}</h1>
  )
}

export default PostTitle