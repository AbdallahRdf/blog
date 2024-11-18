import { Bookmark, Link, MessageSquareText, ThumbsDown, ThumbsUp } from 'lucide-react'
import useReaction from '../../hooks/useReaction';

function InteractionBar({ postId, likes, dislikes, comments }) {

    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(likes, dislikes, postId);
    
    return (
        <div className='flex justify-around mt-2'>

            <button
                title="Like"
                onClick={handleLikeClick}
                className={`transition-colors ease-in-out duration-500 flex gap-x-2 items-center ${isLiked ? 'text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-950' : 'text-neutral-600 dark:text-slate-300 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950'} p-1 rounded-md`}
            >
                <ThumbsUp className='inline size-4 sm:size-5' />
                {
                    likesCount !== 0
                    &&
                    <span className='text-sm md:text-base font-semibold'>{likesCount}</span>
                }
            </button>

            <button 
                title='Dislike' 
                onClick={handleDislikeClick}
                className={`transition-colors ease-in-out duration-500 flex gap-x-2 items-center ${isDisliked ? 'text-rose-600 dark:text-rose-500 bg-rose-100 dark:bg-rose-950' : 'text-neutral-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950'} p-1 rounded-md`}>
                <ThumbsDown className='inline size-4 sm:size-5' />
                {
                    dislikesCount !== 0
                    &&
                    <span className='text-sm md:text-base font-semibold'>{dislikesCount}</span>
                }
            </button>

            <a title='Comments' href='#commentSection' className='transition-colors ease-in-out duration-500 flex gap-x-2 items-center text-neutral-600 dark:text-slate-300 hover:text-cyan-500 p-1 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-950'>
                <MessageSquareText className='inline size-4 sm:size-5' />
                {
                    comments !== 0
                    &&
                    <span className='text-sm md:text-base font-semibold'>{comments}</span>
                }
            </a>

            <button title='Save' className='transition-colors ease-in-out duration-500 text-neutral-600 dark:text-slate-300 hover:text-orange-500 p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-950'>
                <Bookmark className='size-4 sm:size-5' />
            </button>

            <button title='Copy link' className='transition-colors ease-in-out duration-500 text-neutral-600 dark:text-slate-300 hover:text-purple-500 p-1 rounded-md hover:bg-purple-100 dark:hover:bg-purple-950'>
                <Link className='size-4 sm:size-5' />
            </button>
        </div>
    )
}

export default InteractionBar