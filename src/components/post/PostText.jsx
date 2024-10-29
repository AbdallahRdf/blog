import React from 'react'

function PostText({ content }) {
    return (
        <div
            className='prose lg:prose-xl prose-base prose-zinc text-zinc-200 prose-headings:text-zinc-200 prose-headings:my-6 prose-p:text-zinc-200 prose-p:font-normal  prose-p:my-3 prose-a:text-purple-500 prose-a:font-semibold hover:prose-a:text-purple-400 hover:prose-a:underline prose-a:no-underline prose-a:transition-all'
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    )
}

export default PostText