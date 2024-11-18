import { Image, ImageOff } from 'lucide-react';
import useFetchImage from '../../hooks/useFetchImage';

function PostCover({ coverPath }) {

  const { image, isFetching} = useFetchImage(coverPath);

  return (
    <div className='pb-3/6 relative mb-6'>
      {
        isFetching // cover not loaded yet, show skeleton
          ?
          <div title='Loading...' className='transition-colors ease-in-out duration-500 animate-pulse w-full h-full absolute object-cover  bg-gray-200 dark:bg-gray-800 rounded-2xl flex justify-center items-center cursor-wait'>
            < Image className='transition-colors ease-in-out duration-500 text-zinc-50 dark:text-zinc-950 size-28' />
          </div >
          :
          image
            ?
            <img className='w-full h-full absolute object-cover lg:max-w-4xl rounded-3xl' src={image} alt="Blog post cover" />
            :
            <ImageOff className='transition-colors duration-500 ease-in-out rounded-lg text-zinc-400 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-900 box-content mx-auto absolute h-full w-full object-cover' />
      }
    </div>
  )
}

export default PostCover