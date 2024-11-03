import React from 'react'
import { useLocation } from 'react-router-dom'

function ErrorPage() {

  const location = useLocation();
  const statusCode = location.state?.statusCode || 404;
  const message = location.state?.message || "Not Found";

  return (
    <div className='min-h-screen font-mono'>
      <div className='text-zinc-800 dark:text-zinc-200 absolute top-1/3 right-1/2 translate-x-1/2 translate-y-1/3'>
        <div className='text-center text-6xl md:text-7xl lg:text-8xl'>{statusCode}</div>
        <div className='text-center text-2xl md:text-3xl lg:text-4xl'>{message}</div>
      </div>
    </div>
  )
}

export default ErrorPage