import React from 'react'
import Card from './Card'

function Cards({ posts }) {  
  const cards = posts.map((post, index) => <Card key={post._id} post={post} />)

  return (
    <div className='my-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4'>
      {cards}
    </div>
  )
}

export default Cards