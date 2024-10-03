import { SquareUser } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
  return (
    <Link to="/post" className='w-auto border border-slate-700 p-3 rounded-2xl hover:bg-zinc-800 transition-colors ease-in-out'>
        <img className='rounded-lg w-full' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.b7pX53-YGRddIVqSE8qDAAHaEK%26pid%3DApi&f=1&ipt=8c387e015047a58bed7a000221d640917d873fce46f468d26fcc13d931ad05aa&ipo=images" alt="Blog post image" />
        <h3 className='font-bold text-xl mt-4'>This is 2025, let's wrap up this sh*t</h3>
        <p className='text-slate-400 border-s border-fuchsia-500 ps-2  my-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolor?</p>
        <div className='flex gap-x-2'>
            <SquareUser color="#ffffff" size={38} />
            <div>
                <p className='text-sm font-normal'>Abdallah Radfi</p>
                <p className='text-sm font-light'>February 10, 2024</p>
            </div>
        </div>
    </Link>
  )
}

export default Card