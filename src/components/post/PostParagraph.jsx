import React from 'react'

function PostParagraph({ children }) {
  return (
    <p className='text-2xl font-light text-slate-200 my-8'>
        {children}
    </p>
  )
}

export default PostParagraph