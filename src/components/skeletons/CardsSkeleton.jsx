import React from 'react'
import CardSkeleton from './CardSkeleton'

function CardsSkeleton() {  
  return (
    <div className='my-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export default CardsSkeleton