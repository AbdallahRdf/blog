import { CircleUserRoundIcon, Ellipsis, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../utils/formatter'
import useReaction from '../../hooks/useReaction';
import LikeButton from '../commun/LikeButton';
import DislikeButton from '../commun/DislikeButton';

function ReplyBox({ postId, commentId, reply }) {
    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(reply.likes, reply.dislikes, postId, commentId, reply._id);

    // console.log(reply)
    return (
        <div className='relative flex items-start ms-8 md:ms-12'>
            {/* user avatar */}
            <button className='mt-4'>
                <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-600 dark:text-zinc-200' />
            </button>

            {/* reply box */}
            <div className='transition-colors duration-500 ease-in-out flex-grow relative p-4'>
                <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-sm md:text-lg'>{reply.owner.username}</p>
                <p className='transition-colors duration-500 ease-in-out text-zinc-600 dark:text-zinc-300 font-normal text-xs sm:text-base'>{formatDate(reply.createdAt)}</p>
                <p className='transition-colors duration-500 ease-in-out text-sm md:text-lg text-zinc-800 dark:text-zinc-200 my-1 sm:my-3'>{reply.body}</p>
                
                <div className='flex gap-5 mt-3'>

                    <LikeButton
                        handleLikeClick={handleLikeClick}
                        isLiked={isLiked}
                        likesCount={likesCount}
                        iconClassName="inline size-4 md:size-5"
                        countClassName="text-sm md:text-base"
                    />

                    <DislikeButton
                        handleDislikeClick={handleDislikeClick}
                        isDisliked={isDisliked}
                        dislikesCount={dislikesCount}
                        iconClassName="inline size-4 md:size-5"
                        countClassName="text-sm md:text-base"
                    />

                    <button className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-200 rounded-xl p-1'>
                        <MessageCircle className='inline size-4 md:size-5' />
                    </button>
                </div>

                {/* options */}
                <button className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full p-1 m-1 absolute top-0 right-0'>
                    <Ellipsis className="size-4 md:size-5 inline" />
                </button>
            </div>
        </div>
    )
}

export default ReplyBox