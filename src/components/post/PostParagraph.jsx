import React from 'react'

function PostParagraph({ children }) {
  return (
    <p className='text-xl md:text-2xl font-light text-slate-200 my-4 md:my-8'>
        {children}
    </p>
  )
}

export default PostParagraph