import React from 'react'

function PostCover({ url }) {
  return (
    <img className='w-full lg:max-w-4xl h-fit rounded-3xl mb-6' src={url} alt="Blog post cover" />
  )
}

export default PostCover