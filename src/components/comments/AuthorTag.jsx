import React from 'react'

function AuthorTag() {
    return (
        <>
            <span className="font-light mx-1">|</span>
            <span className='transition-colors duration-500 ease-in-out text-xs sm:text-sm text-zinc-700 dark:text-zinc-200  bg-slate-200 dark:bg-slate-600 rounded-full ms-1 px-1 py-px'>Author</span>
        </>
    )
}

export default AuthorTag