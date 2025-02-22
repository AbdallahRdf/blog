import React, { useEffect } from 'react'
import Comment from './Comment'
import useCustomAxios from '../../hooks/useCustomAxios';
import { Loader } from 'lucide-react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// number of comments to fetch
const LIMIT = 20;

function Comments({ postId, sorting, commentsCount, setCommentsCount, inViewForCommentsLazyLoading }) {

    const { ref, inView } = useInView()

    const customAxios = useCustomAxios();

    const fetchComments = async ({ pageParam }) => {
        try {
            const response = await customAxios.get(`/posts/${postId}/comments?limit=${LIMIT}${pageParam ? `&cursor=${pageParam}` : ''}&sort=${sorting}`);
            return response?.data;
        } catch (error) {
            throw error;
        }
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchNextPage,
        status,
        refetch
    } = useSuspenseInfiniteQuery({
        queryKey: ['comments', postId, sorting],
        queryFn: fetchComments,
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage?.cursor,
        enabled: inViewForCommentsLazyLoading,
        retry: 5
    });

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    useEffect(() => {
        if (data.pages[0].commentsCount !== commentsCount) {
            setCommentsCount(data.pages[0].commentsCount);
        }
    }, [data.pages[0].commentsCount]);

    return (
        <>
            {
                data.pages[0].comments.length > 0
                    ?
                    data.pages.map(page => page.comments.map(comment => <Comment key={comment._id} comment={comment} postId={postId} />))
                    :
                    <div className='transition-colors duration-500 ease-in-out text-slate-900 dark:text-slate-100 text-lg md:text-2xl text-center my-20'>No Comments</div>
            }

            {
                (status !== "error" && isFetching && hasNextPage)
                &&
                <div className='text-zinc-950 dark:text-zinc-50 mt-16 mb-14'>
                    <Loader className='animate-spin size-8 mx-auto' />
                </div>
            }

            <div ref={ref}></div>

            {
                status === "error"
                &&
                <div className='flex justify-center'>
                    <p className='transition-colors duration-500 ease-in-out text-lg sm:text-xl text-zinc-700 dark:text-zinc-200 mx-auto'>
                        Unable to load more comments
                    </p>
                </div>
            }
        </>
    )
}

export default Comments