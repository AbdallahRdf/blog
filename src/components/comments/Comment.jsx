import { ChevronDown, ChevronUp, CircleUserRoundIcon, Ellipsis, Loader } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import Reply from './Reply';
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
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT = 2; // number of replies to fetch

function Comment({ comment, postId }) {
    const { user } = useContext(AuthContext);
    const { isDarkMode } = useContext(ThemeContext);

    const toastIdRef = useRef(null);

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
            toast.dismiss(toastIdRef.current);
            toast.clearWaitingQueue();
            toastIdRef.current = toast('You need to log in to perform this action. Please log in or sign up to continue.', {
                theme: isDarkMode ? "dark" : "light"
            });
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
                <button className='mt-4'>
                    <CircleUserRoundIcon className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-800 dark:text-zinc-200' />
                </button>

                {/* comment box */}
                <div className='transition-colors duration-500 ease-in-out flex-grow relative py-4 ps-3'>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 font-semibold text-sm md:text-lg'>{comment.owner.username}</p>
                    <p className='transition-colors duration-500 ease-in-out text-zinc-600 dark:text-zinc-400 font-normal text-xs sm:text-base'>{formatDate(comment.createdAt)}</p>
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
                            <CommentsButton comments={data?.pages[0].repliesCount || comment.replies} iconClassName="inline size-4 md:size-5" countClassName="text-sm md:text-base" />
                        </button>

                        {
                            comment.replies > 0
                            &&
                            <button
                                title={isRepliesOpen ? 'Hide replies' : 'Show replies'}
                                onClick={() => {
                                    setEnabled(prev => !prev);
                                    setIsRepliesOpen(prev => !prev);
                                }}
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
                <ReplyForm parentUsername={comment.owner.username} setShowReplyForm={setShowReplyForm} postId={postId} commentId={comment._id} />
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
                isRepliesOpen
                &&
                <button
                    onClick={hasNextPage ? fetchNextPage : () => {
                        setEnabled(prev => !prev);
                        setIsRepliesOpen(false)
                    }}
                    disabled={isFetchingNextPage}
                    className='transition-colors duration-500 ease-in-out text-blue-500 dark:text-blue-400 hover:underline p-2 rounded-md flex items-center gap-2 color ms-12 md:ms-24 my-3'
                >
                    {
                        hasNextPage
                            ?
                            <>
                                <span>Load more replies</span>
                                <ChevronDown />
                            </>
                            :
                            <>
                                <span>Collapse replies</span>
                                <ChevronUp />
                            </>
                    }
                </button>
            }
        </>
    )
}

export default Comment