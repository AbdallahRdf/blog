import React from 'react'
import { Link } from 'react-router-dom'
import InteractionBar from './InteractionBar'
import PostTag from './PostTag'
import { Calendar, ImageOff } from 'lucide-react'
import { formatDate } from '../../utils/formatter'
import useFetchImage from '../../hooks/useFetchImage'
import PostCoverSkeleton from '../skeletons/PostCoverSkeleton'

function Card({ post }) {

  const { image: cover, isFetching } = useFetchImage(post.cover);

  const postedAt = formatDate(post.createdAt);

  const tags = post.tags.map((tag, index) => <PostTag key={index} tag={tag} />);

  return (
    <div className='h-fit border border-slate-300 dark:border-slate-700 p-3 pb-2 rounded-2xl hover:border-slate-800 dark:hover:border-slate-300 transition-colors ease-in-out duration-500'>
      <Link to={`/posts/${post.slug}`}>
        <h3 className='font-extrabold text-xl sm:text-2xl my-3 sm:my-4 text-zinc-900 dark:text-zinc-100 transition-colors ease-in-out duration-500'>{post.title}</h3>

        <div className='flex gap-x-2 my-2 sm:my-3 text-xs md:text-sm overflow-hidden'>
          {tags}
        </div>

        <p className='transition-colors ease-in-out duration-500 text-sm text-neutral-600 dark:text-slate-300 font-normal ms-2 mb-2 sm:mb-3 flex items-center gap-2'>
          <Calendar className='inline size-3 sm:size-4' />
          <span>{postedAt}</span>
        </p>

        <div className='pb-7/12 sm:pb-3/5 relative'>
          {
            isFetching
              ?
              <PostCoverSkeleton />
              :
              cover
                ?
                <img className='rounded-lg absolute h-full w-full object-cover' src={cover} alt='post cover' />
                :
                <ImageOff className='transition-colors duration-500 ease-in-out rounded-lg text-zinc-400 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-900 box-content mx-auto absolute h-full w-full object-cover' />
          }
        </div>
      </Link>
      <InteractionBar post={post} />
    </div>
  )
}

export default Card