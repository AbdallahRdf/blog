import React from 'react'

function PostImagePreviewMode({url}) {
  return (
    <img className="w-full rounded-xl mx-auto my-6 sm:my-8" src={url} alt="image" />
  )
}

export default PostImagePreviewMode