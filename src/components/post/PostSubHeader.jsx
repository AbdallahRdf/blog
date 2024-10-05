import React from 'react'

function PostSubHeader({children}) {
  return (
    <h2 className='text-xl md:text-2xl font-semibold my-4 md:my-6'>{children}</h2>
  )
}

export default PostSubHeader