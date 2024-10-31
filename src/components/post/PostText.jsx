import React from 'react'

function PostText({ content }) {
    return (
        <div
            className='prose lg:prose-xl prose-base prose-zinc prose-headings:text-zinc-700 dark:prose-headings:text-zinc-200 prose-headings:my-6 prose-headings:transition-colors prose-headings:duration-300 prose-headings:ease-in-out prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-p:font-normal  prose-p:my-3 prose-p:transition-colors prose-p:duration-300 prose-p:ease-in-out prose-a:text-purple-600 dark:prose-a:text-purple-500 prose-a:font-semibold hover:prose-a:text-purple-500 dark:hover:prose-a:text-purple-400 hover:prose-a:underline prose-a:no-underline prose-a:transition-all prose-a:duration-300 prose-a:ease-in-out'
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    )
}

export default PostText