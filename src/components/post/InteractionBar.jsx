import React from 'react'
import { Bookmark, Check, Link } from 'lucide-react'
import useReaction from '../../hooks/useReaction';
import useCopy from '../../hooks/useCopy';
import LikeButton from '../commun/LikeButton';
import DislikeButton from '../commun/DislikeButton';
import CommentsButton from '../commun/CommentsButton';

function InteractionBar({ post }) {

    const { _id: postId, slug, likes, dislikes, comments } = post;

    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(likes, dislikes, postId);

    const { isCopied, copy } = useCopy();

    const handleCopy = () => copy(`${location.protocol}//${location.host}/posts/${slug}`);

    return (
        <div className='transition-colors duration-500 ease-in-out flex justify-around border-y border-slate-300 dark:border-slate-700 py-1 sm:py-2 base:py-3 px-2'>

            <LikeButton
                handleLikeClick={handleLikeClick}
                isLiked={isLiked}
                likesCount={likesCount}
                iconClassName="inline size-5 md:size-6"
                countClassName="text-base md:text-lg font-semibold"
            />

            <DislikeButton
                handleDislikeClick={handleDislikeClick}
                isDisliked={isDisliked}
                dislikesCount={dislikesCount}
                iconClassName="inline size-5 md:size-6"
                countClassName="text-base md:text-lg font-semibold"
            />

            <a title="Comments" href='#comments' className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-slate-500 dark:text-slate-100 hover:text-cyan-500 p-1 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-950'>
                <CommentsButton comments={comments} iconClassName="inline size-5 md:size-6" countClassName="text-base md:text-lg font-semibold" />
            </a>

            {/* // TODO:  */}
            <button title='Save' className='transition-colors duration-500 ease-in-out text-slate-500 dark:text-slate-100 hover:text-orange-500 p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-950'>
                <Bookmark className='size-5 md:size-6' />
            </button>

            <button
                disabled={isCopied}
                onClick={handleCopy}
                title={isCopied ? 'Coppied' : 'Copy link'}
                className='transition-colors duration-500 ease-in-out hidden md:block text-slate-500 dark:text-slate-300 hover:text-purple-500 p-1 rounded-md hover:bg-purple-100 dark:hover:bg-purple-950'
            >
                {
                    isCopied
                        ?
                        <Check className='size-5 sm:size-6' />
                        :
                        <Link className='size-5 sm:size-6' />
                }
            </button>
        </div>
    )
}

export default InteractionBar