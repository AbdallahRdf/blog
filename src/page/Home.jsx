import React from 'react'
import Cards from '../components/Cards'

function Home() {
  return (
    <main className='px-4 mx-auto mt-36' >
      <h1 className='text-4xl font-extrabold'>Latest posts</h1>
      <Cards />
    </main>
  )
}

export default Home