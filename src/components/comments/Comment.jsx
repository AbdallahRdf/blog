import { ChevronDown, ChevronUp, CircleUserRoundIcon, Ellipsis, Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Reply from './Reply';
import { formatDate } from '../../utils/formatter';
import { AuthContext } from '../../context/contexts';
import userRoles from '../../enums/userRoles';
import useReaction from '../../hooks/useReaction';
import ReplyForm from './ReplyForm';
import LikeButton from '../commun/LikeButton';
import DislikeButton from '../commun/DislikeButton';
import useCustomAxios from '../../hooks/useCustomAxios';
import { useInfiniteQuery } from '@tanstack/react-query';
import ReplyButton from './ReplyButton';
import useToast from '../../hooks/useToast';

const LIMIT = 15; // number of replies to fetch

function Comment({ comment, postId }) {
    const { user } = useContext(AuthContext);

    const { showToast } = useToast();

    const customAxios = useCustomAxios();

    const { likesCount, dislikesCount, isLiked, isDisliked, handleLikeClick, handleDislikeClick } = useReaction(
        comment.likes,
        comment.dislikes,
        postId,
        comment._id
    );

    const [enabled, setEnabled] = useState(false);

    const [isRepliesOpen, setIsRepliesOpen] = useState(false);

    const [showReplyForm, setShowReplyForm] = useState(false);

    const fetchReplies = async ({ pageParam }) => {
        const response = await customAxios.get(`/posts/${postId}/comments/${comment._id}/replies?limit=${LIMIT}${pageParam ? `&cursor=${pageParam}` : ''}`);
        return response?.data;
    }

    // show reply form if user is logged in else show toast
    const handleClick = () => {
        if (user) {
            setShowReplyForm(prev => !prev);
        } else {
            showToast('You need to log in to perform this action. Please log in or sign up to continue.');
        }
    }

    const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["replies", postId, comment._id],
        queryFn: fetchReplies,
        initialPageParam: null,
        getNextPageParam: (lastPage, allPages) => lastPage?.cursor,
        enabled: enabled
    })

    return (
        <>
            <div className='relative flex items-start'>
                {/* user avatar */}
                <button className='mt-3'>
                    <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-800 dark:text-zinc-200' />
                </button>

                {/* comment box */}
                <div className='transition-colors duration-500 ease-in-out flex-grow relative py-2 ps-3'>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-sm md:text-lg'>{comment.owner.username}</p>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-600 dark:text-zinc-400 font-normal text-xs sm:text-sm'>{formatDate(comment.createdAt)}</p>
                    <p className='transition-colors duration-500 ease-in-out text-sm md:text-lg text-zinc-800 dark:text-zinc-200 my-1'>{comment.body}</p>

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

                        <ReplyButton handleClick={handleClick} />

                        {
                            comment.replies > 0
                            &&
                            <button
                                title={isRepliesOpen ? 'Hide replies' : 'Show replies'}
                                onClick={() => {
                                    setEnabled(prev => !prev);
                                    setIsRepliesOpen(prev => !prev);
                                }}
                                className='transition-colors duration-500 ease-in-out flex text-blue-500 dark:text-blue-400 gap-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full py-2 px-1'
                            >
                                {
                                    isRepliesOpen
                                        ?
                                        <ChevronUp className='size-5 sm:size-6' />
                                        :
                                        <ChevronDown className='size-5 sm:size-6' />
                                }
                                <span className="text-sm md:text-base">{comment.replies === 1 ? `${comment.replies} reply` : `${comment.replies} replies`}</span>
                            </button>
                        }
                    </div>

                    {/* options */}
                    {
                        //todo: make his work
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
                <ReplyForm replyUsername={comment.owner.username} setShowReplyForm={setShowReplyForm} postId={postId} commentId={comment._id} />
            }

            {/* replies */}
            <div className={`${isRepliesOpen ? "block" : "hidden"}`}>
                {
                    data === undefined && isFetching
                        ?
                        <div className='text-zinc-950 dark:text-zinc-50'>
                            <Loader className='animate-spin size-7 mx-auto' />
                        </div>
                        :
                        data?.pages.map(page => page.replies.map(reply => <Reply key={reply._id} postId={postId} commentId={comment._id} reply={reply} />))
                }
            </div>

            {
                isFetchingNextPage && hasNextPage
                &&
                <div className='text-zinc-950 dark:text-zinc-50'>
                    <Loader className='animate-spin size-7 mx-auto' />
                </div>
            }

            {
                isRepliesOpen && hasNextPage
                &&
                <button
                    onClick={fetchNextPage}
                    disabled={isFetchingNextPage}
                    className='transition-colors duration-500 ease-in-out text-blue-500 dark:text-blue-400 hover:underline p-2 rounded-md flex items-center gap-1 color ms-12 md:ms-24'
                >
                    <span>Load more replies</span>
                    <ChevronDown className='hover:bg-blue-100 dark:hover:bg-blue-950 rounded-full p-1 size-6 sm:size-8' />
                </button>
            }
        </>
    )
}

export default Comment