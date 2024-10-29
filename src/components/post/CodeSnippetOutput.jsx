import React from 'react'

function CodeSnippetOutput({output}) {
  return (
    <div className='border border-slate-800 my-6 rounded-2xl overflow-x-auto'>
      <div className='text-slate-300 border-b border-slate-800 bg-slate-800 py-2 px-3'>Output</div>
      <div className='bg-zinc-950 px-4 py-6'>{output}</div>
    </div>
  )
}

export default CodeSnippetOutput