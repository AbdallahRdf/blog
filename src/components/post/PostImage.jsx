import React from 'react'
import useFetchImage from '../../hooks/useFetchImage'
import { Image, ImageOff } from 'lucide-react';

function PostImage({ path }) {

  const { image, isFetching } = useFetchImage(path);
  return (
    <div className='my-6 sm:my-8 '>
      {
        isFetching
          ?
          <div title='Loading...' className='transition-colors ease-in-out duration-500 animate-pulse w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl flex justify-center items-center cursor-wait'>
            < Image className='transition-colors ease-in-out duration-500 text-zinc-50 dark:text-zinc-950 size-28' />
          </div >
          :
          image
            ?
            <img className='w-full lg:max-w-4xl rounded-lg' src={image} alt="Blog post cover" />
            :
            <ImageOff className='transition-colors duration-500 ease-in-out rounded-lg text-zinc-400 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-900 box-content py-16 w-full h-28 sm:h-36' />
      }
    </div>
  )
}

export default PostImage