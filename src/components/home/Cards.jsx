import React from 'react'
import Card from './Card'

function Cards() {
  return (
    <div className='my-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  )
}

export default Cards