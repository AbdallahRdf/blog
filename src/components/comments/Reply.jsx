import { CircleUserRoundIcon, Ellipsis } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { formatDate } from '../../utils/formatter'
import useReaction from '../../hooks/useReaction';
import LikeButton from '../commun/LikeButton';
import DislikeButton from '../commun/DislikeButton';
import ReplyButton from './ReplyButton';
import useToast from '../../hooks/useToast';
import { AuthContext, PostAuthorContext } from '../../context/contexts';
import ReplyForm from './ReplyForm';
import AuthorTag from './AuthorTag';
import Options from './Options';
import userRoles from '../../enums/userRoles';

function ReplyBox({ postId, commentId, reply }) {

    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(
        reply.likes,
        reply.dislikes,
        postId,
        commentId,
        reply._id
    );

    const { user } = useContext(AuthContext);
    const { author } = useContext(PostAuthorContext);

    const [showReplyForm, setShowReplyForm] = useState(false);

    const { showToast } = useToast();

    // show reply form if user is logged in else show toast
    const handleClick = () => {
        if (user) {
            setShowReplyForm(prev => !prev);
        } else {
            showToast('You need to log in to perform this action. Please log in or sign up to continue.');
        }
    }

    const replyText = reply.body.split(' ').map((word, index) => {
        if (word === reply.replyUsername) {
            return <a key={index} href={`/users/${word}`} className='font-bold text-blue-500 hover:underline'> {word} </a>
        }
        return `${word} `;
    });

    return (
        <>
            <div className='relative flex items-start ms-8 md:ms-12'>
                {/* user avatar */}
                <button className='mt-2 sm:mt-3'>
                    <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-7 md:size-8 text-zinc-600 dark:text-zinc-200' />
                </button>

                {/* reply box */}
                <div className='transition-colors duration-500 ease-in-out flex-grow relative p-2'>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-xs md:text-base'>
                        {reply.owner.username}
                        {
                            author === reply.owner._id
                            &&
                            <AuthorTag />
                        }
                    </p>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-600 dark:text-zinc-400 font-normal text-xs sm:text-sm'>
                        {formatDate(reply.createdAt)}
                    </p>
                    <p className='transition-colors duration-500 ease-in-out text-sm md:text-lg text-zinc-800 dark:text-zinc-200 my-1'>
                        {replyText}
                    </p>

                    <div className='flex gap-5'>

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

                        <ReplyButton handleClick={handleClick} />

                    </div>

                    {/* options */}
                    {
                        // if user is the owner of the comment or user is not a normal user
                        (user && (user.id === reply.owner._id || user.role !== userRoles.USER))
                        &&
                        <Options
                            ownerId={reply.owner._id}
                            postId={postId}
                            commentId={commentId}
                            replyId={reply._id}
                            commentText={reply.body}
                            replyUsername={reply.replyUsername}
                        />
                    }
                </div>
            </div>
            {/* reply form */}
            {
                showReplyForm
                &&
                <ReplyForm replyUsername={reply.owner.username} setShowReplyForm={setShowReplyForm} postId={postId} commentId={commentId} replyId={reply._id} />
            }
        </>
    )
}

export default ReplyBox