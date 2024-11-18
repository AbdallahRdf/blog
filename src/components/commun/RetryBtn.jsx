import { RefreshCw } from 'lucide-react'
import React from 'react'

function RetryBtn({ label, retry, paddingY = 'py-8' }) {
    return (
        <div className={`flex flex-col justify-center items-center gap-2 ${paddingY}`}>
            <p className='transition-colors duration-500 ease-in-out text-lg sm:text-xl text-zinc-700 dark:text-zinc-200'>{label}</p>
            <button onClick={retry} className='transition-all duration-500 ease-in-out border border-zinc-200 bg-slate-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:border-zinc-800 dark:hover:text-zinc-200 text-base sm:text-lg py-2 sm:py-3 px-6 sm:px-8 mt-3 rounded-lg flex justify-center items-center gap-2'>
                <RefreshCw className='inline-block size-5 sm:size-6' />
                <span>Try again</span>
            </button>
        </div>
    )
}

export default RetryBtn