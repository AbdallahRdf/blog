import React from 'react'

function PostImage({url}) {
  return (
    <img className="w-full rounded-3xl mx-auto mb-8" src={url} alt="image" />
  )
}

export default PostImage