import { ChevronDown, ChevronUp, CircleUserRoundIcon, Ellipsis } from 'lucide-react'
import React, { useContext, useState } from 'react'
import ReplyBox from './ReplyBox';
import { formatDate } from '../../utils/formatter';
import { AuthContext, ThemeContext } from '../../context/contexts';
import userRoles from '../../enums/userRoles';
import useReaction from '../../hooks/useReaction';
import ReplyForm from './ReplyForm';
import LikeButton from '../commun/LikeButton';
import DislikeButton from '../commun/DislikeButton';
import CommentsButton from '../commun/CommentsButton'
import { toast } from 'react-toastify';
import useCustomAxios from '../../hooks/useCustomAxios';

function Comment({ comment, postId }) {
    const { user } = useContext(AuthContext);
    const { isDarkMode } = useContext(ThemeContext)

    const customAxios = useCustomAxios();

    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(comment.likes, comment.dislikes, postId, comment._id);

    const [isRepliesOpen, setIsRepliesOpen] = useState(false);

    const [showReplyForm, setShowReplyForm] = useState(false);

    const [replies, setReplies] = useState(null)

    //TODO: fetch replies
    const fetchReplies = async () => {
        const response = await customAxios.get(`/posts/${postId}/comments/${comment._id}/replies`)
        setReplies(response.data.replies)
    }

    const handleRepliesBtnClick = () => {
        setIsRepliesOpen(prev => !prev)
        if (!isRepliesOpen && replies === null) {
            fetchReplies()
        }
    }

    // show reply form if user is logged in else show toast
    const handleClick = () => {
        if (user) {
            setShowReplyForm(prev => !prev);
        } else {
            toast('You need to log in to perform this action. Please log in or sign up to continue.', {
                theme: isDarkMode ? "dark" : "light"
            });
        }
    }

    return (
        <>
            <div className='relative flex items-start'>
                {/* user avatar */}
                <button className='mt-4'>
                    <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-800 dark:text-zinc-200' />
                </button>

                {/* comment box */}
                <div className='transition-colors duration-500 ease-in-out flex-grow relative py-4 ps-3'>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-sm md:text-lg'>{comment.owner.username}</p>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-600 dark:text-zinc-300 font-normal text-xs sm:text-base'>{formatDate(comment.createdAt)}</p>
                    <p className='transition-colors duration-500 ease-in-out text-sm md:text-lg text-zinc-800 dark:text-zinc-200 my-1 sm:my-3'>{comment.body}</p>

                    {/* likes and replies */}
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

                        <button
                            onClick={handleClick}
                            title='Reply'
                            className='transition-colors duration-500 ease-in-out flex gap-x-2 items-center hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-200 rounded-xl p-1'
                        >
                            <CommentsButton comments={comment.replies} iconClassName="inline size-4 md:size-5" countClassName="text-sm md:text-base" />
                        </button>

                        {
                            comment.replies > 0
                            &&
                            <button
                                title={isRepliesOpen ? 'Hide replies' : 'Show replies'}
                                onClick={handleRepliesBtnClick}
                                className='transition-colors duration-500 ease-in-out flex text-blue-500 dark:text-blue-400 gap-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full p-2'
                            >
                                {
                                    isRepliesOpen
                                        ?
                                        <ChevronUp />
                                        :
                                        <ChevronDown />
                                }
                            </button>
                        }
                    </div>

                    {/* options */}
                    {
                        // if user is the owner of the comment or user is not a normal user
                        (user && (user.id === comment.owner._id || user.role !== userRoles.USER))
                        &&
                        <button className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full p-1 m-1 absolute top-0 right-0'>
                            <Ellipsis className="size-4 md:size-5 inline" />
                        </button>
                    }
                </div>
            </div>

            {/* reply form */}
            {
                showReplyForm
                &&
                <ReplyForm replyToUser={comment.owner} setShowReplyForm={setShowReplyForm} fetchReplies={fetchReplies} postId={postId} commentId={comment._id} />
            }

            <div className={`${isRepliesOpen ? "block" : "hidden"}`}>
                { replies?.map(reply => <ReplyBox key={reply._id} postId={postId} commentId={comment._id} reply={reply} />) }
            </div>
        </>
    )
}

export default Comment