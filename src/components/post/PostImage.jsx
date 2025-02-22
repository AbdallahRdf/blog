import React from 'react'
import useFetchImage from '../../hooks/useFetchImage'
import { ImageOff } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import PostImageSkeleton from '../skeletons/PostImageSkeleton';

function PostImage({ path }) {

  const { image, isFetching } = useFetchImage(path);

  return (
    <div className='my-6 sm:my-8 '>
      {
        isFetching
          ?
          <PostImageSkeleton />
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