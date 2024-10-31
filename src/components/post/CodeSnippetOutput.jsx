import React from 'react'

function CodeSnippetOutput({output}) {
  return (
    <div className='border border-zinc-800 my-6 rounded-2xl overflow-x-auto'>
      <div className='transition-colors duration-300 ease-in-out text-slate-300 border-b border-zinc-700 bg-zinc-700 dark:bg-zinc-800 py-2 px-3'>Output</div>
      <div className='bg-zinc-950 px-4 py-6 text-slate-50'><pre>{output}</pre></div>
    </div>
  )
}

export default CodeSnippetOutput