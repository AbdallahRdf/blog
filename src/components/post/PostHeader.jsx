import React from 'react'

function PostHeader({children}) {
  return (
    <h2 className='text-4xl font-semibold mt-12 mb-10'>{children}</h2>
  )
}

export default PostHeader