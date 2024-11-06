import React from 'react'
import { Link } from 'react-router-dom'
import InteractionBar from './InteractionBar'
import PostTag from './PostTag'
import { Calendar } from 'lucide-react'

function Card() {
  return (
    <div className='w-auto border border-slate-300 dark:border-slate-700 p-3 pb-2 rounded-2xl hover:border-slate-800 dark:hover:border-slate-200 transition-colors ease-in-out duration-300'>
      <Link to="/post">
        <h3 className='font-bold text-xl sm:text-3xl my-4 text-zinc-900 dark:text-zinc-100 transition-colors ease-in-out duration-300'>This is 2025, let's wrap up this sh*t</h3>

        <div className='flex gap-x-2 my-3'>
          <PostTag>#networking</PostTag>
          <PostTag>#cisco</PostTag>
          <PostTag>#vlans</PostTag>
          <PostTag>+3</PostTag>
        </div>

        <p className='transition-colors ease-in-out duration-300 text-sm text-neutral-500 dark:text-slate-300 font-normal ms-2 mb-3 flex items-center gap-2'>
          <Calendar className='inline size-3 sm:size-4' />
          <span>February 10, 2024</span>
        </p>

        <img className='rounded-lg w-full' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.b7pX53-YGRddIVqSE8qDAAHaEK%26pid%3DApi&f=1&ipt=8c387e015047a58bed7a000221d640917d873fce46f468d26fcc13d931ad05aa&ipo=images" alt="Blog post image" />
      </Link>
      <InteractionBar forPostPage={false} />
    </div>
  )
}

export default Card