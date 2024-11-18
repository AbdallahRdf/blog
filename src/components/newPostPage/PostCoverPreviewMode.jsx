import React from 'react'

function PostCoverPreviewMode({url}) {
    return (
        <div className='pb-3/6 relative  mb-6'>
            <img className='w-full h-full absolute object-cover lg:max-w-4xl rounded-3xl' src={url} alt="Blog post cover" />
        </div>
    )
}

export default PostCoverPreviewMode