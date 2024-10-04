import React from 'react'

function CustomLink({url, children}) {
  return (
    <a href={url} target='_blank' className='text-fuchsia-500 font-semibold hover:text-fuchsia-400 px-1'>
      {children}
    </a>
  )
}

export default CustomLink