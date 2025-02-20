import { ImageOff } from 'lucide-react';
import useFetchImage from '../../hooks/useFetchImage';
import PostCoverSkeleton from '../skeletons/PostCoverSkeleton';

function PostCover({ coverPath }) {

  const { image, isFetching } = useFetchImage(coverPath);

  return (
    <div className='pb-3/6 relative mb-6'>
      {
        isFetching // cover not loaded yet, show skeleton
          ?
          <PostCoverSkeleton />
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