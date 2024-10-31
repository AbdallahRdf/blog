import React from 'react'
import Cards from '../components/userHomePage/Cards'
import { ListFilter } from 'lucide-react'

function UserHomePage() {
  return (
    <div>
      <div className='flex justify-between px-2 items-center flex-nowrap gap-y-3'>
        <h1 className='text-3xl sm:text-4xl font-extrabold transition-colors duration-300 ease-in-out dark:text-zinc-200'>Latest posts</h1>
        <div className='flex items-center transition-colors duration-300 ease-in-out dark:text-zinc-200'>
            <label htmlFor='sort' className=''>
              <ListFilter className='inline size-5 sm:size-6' />
            </label>
            <select id="sort" className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer'>
              <option value="latest">Latest</option>
              <option value="newest">Newest</option>
              <option value="top">Top</option>
            </select>
        </div>
      </div>
      <Cards />
    </div>
  )
}

export default UserHomePage