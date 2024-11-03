import { LoaderCircle } from 'lucide-react'
import React from 'react'

function LoadingPage() {
  return (
    <div className='text-zinc-950 dark:bg-zinc-50 absolute top-1/3 right-1/2 translate-x-1/2 translate-y-1/3'>
      <LoaderCircle className="animate-spin size-8" />
    </div>
  )
}

export default LoadingPage