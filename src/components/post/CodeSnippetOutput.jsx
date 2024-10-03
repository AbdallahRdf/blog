import React from 'react'

function CodeSnippetOutput({children}) {
  return (
    <div className='bg-slate-900 my-6 rounded-2xl overflow-x-auto px-4 py-6'>{children}</div>
  )
}

export default CodeSnippetOutput