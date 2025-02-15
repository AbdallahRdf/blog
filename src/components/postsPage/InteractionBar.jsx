import { Link } from 'react-router-dom';
import { Bookmark, Check, Link as LinkIcon } from 'lucide-react';
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
        <div className='flex justify-around mt-2'>

            <LikeButton
                handleLikeClick={handleLikeClick}
                isLiked={isLiked}
                likesCount={likesCount}
                iconClassName="inline size-4 sm:size-5"
                countClassName="text-sm md:text-base font-semibold"
            />

            <DislikeButton
                handleDislikeClick={handleDislikeClick}
                isDisliked={isDisliked}
                dislikesCount={dislikesCount}
                iconClassName="inline size-4 sm:size-5"
                countClassName="text-sm md:text-base font-semibold"
            />

            <Link to={`/posts/${slug}`} title='Comments' className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center text-neutral-600 dark:text-slate-300 hover:text-cyan-500 p-1 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-950'>
                <CommentsButton comments={comments} iconClassName="inline size-4 sm:size-5" countClassName="text-sm md:text-base font-semibold" />
            </Link>

            {/* // TODO:  */}
            <button title='Save' className='transition-colors duration-500 ease-in-out text-neutral-600 dark:text-slate-300 hover:text-orange-500 p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-950'>
                <Bookmark className='size-4 sm:size-5' />
            </button>

            <button
                disabled={isCopied}
                onClick={handleCopy}
                title={isCopied ? 'Coppied' : 'Copy link'}
                className='transition-colors duration-500 ease-in-out text-neutral-600 dark:text-slate-300 hover:text-purple-500 p-1 rounded-md hover:bg-purple-100 dark:hover:bg-purple-950'
            >
                {
                    isCopied
                        ?
                        <Check className='size-4 sm:size-5' />
                        :
                        <LinkIcon className='size-4 sm:size-5' />
                }
            </button>
        </div>
    )
}

export default InteractionBar