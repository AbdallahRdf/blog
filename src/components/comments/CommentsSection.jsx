import React, { Suspense, useContext, useState } from 'react'
import CommentFrom from './CommentFrom';
import { ListFilter, Loader } from 'lucide-react';
import RetryBtn from '../commun/RetryBtn';
import { AuthContext } from '../../context/contexts';
import { formatNumber } from '../../utils/formatter';
import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { ErrorBoundary } from 'react-error-boundary';
import Comments from './Comments';

function CommentsSection({ postId }) {

    const queryClient = useQueryClient();

    const { reset } = useQueryErrorResetBoundary();

    const { user } = useContext(AuthContext);

    const [sorting, setSorting] = useState("latest")

    const [commentsCount, setCommentsCount] = useState(0);

    const { ref: refForCommentsLazyLoading, inView: inViewForCommentsLazyLoading } = useInView({
        triggerOnce: true
    })

    return (
        <div className='mt-8 border-t border-slate-700'>
            <div className="mx-3 xl:mx-0">
                <div className='flex justify-between px-2  mt-6 mb-2 sm:mb-8 '>

                    <p id='comments' className='transition-colors duration-500 ease-in-out text-2xl md:text-3xl text-slate-900 dark:text-slate-100'>
                        Comments {commentsCount > 0 ? `(${formatNumber(commentsCount)})` : '(0)'}
                    </p>

                    <div className='flex items-center transition-colors duration-500 ease-in-out dark:text-zinc-200'>
                        <label htmlFor='sort' className=''>
                            <ListFilter className='inline size-5 sm:size-6' />
                        </label>
                        <select
                            value={sorting}
                            onChange={(e) => {
                                setSorting(e.target.value);
                                refetch();
                            }}
                            className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer transition-colors duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50'
                        >
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='top'>Top</option>
                        </select>
                    </div>

                </div>

                <div ref={refForCommentsLazyLoading}></div>

                {user && <CommentFrom postId={postId} fetchComments={fetchComments} />}

                <ErrorBoundary
                    onReset={() => {
                        reset();
                        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
                    }}
                    fallbackRender={({ resetErrorBoundary }) => <RetryBtn label='Unable to load comments' onClick={() => resetErrorBoundary()} paddingY='py-36' />}
                >
                    <Suspense fallback={
                        <div className='text-zinc-950 dark:text-zinc-50 mt-16 mb-14'>
                            <Loader className='animate-spin size-8 mx-auto' />
                        </div>
                    }>
                        <Comments postId={postId} sorting={sorting} commentsCount={commentsCount} setCommentsCount={setCommentsCount} inViewForCommentsLazyLoading={inViewForCommentsLazyLoading}/>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default CommentsSection