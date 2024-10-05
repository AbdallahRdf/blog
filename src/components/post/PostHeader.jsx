import React from 'react'

function PostHeader({children}) {
  return (
    <h2 className='text-3xl md:text-4xl font-semibold mt-6 mb-6 md:mt-8 md:mb-10'>{children}</h2>
  )
}

export default PostHeader