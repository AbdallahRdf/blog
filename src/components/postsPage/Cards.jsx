import React, { useEffect, useState } from 'react'
import { ListFilter, Loader } from 'lucide-react'
import useCustomAxios from '../../hooks/useCustomAxios';
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import Card from './Card'
import { useInView } from 'react-intersection-observer';

// number of posts to fetch
const LIMIT = 9;

function Cards() {

    const { ref, inView } = useInView();

    const [sorting, setSorting] = useState(sessionStorage.getItem('postSort') ?? 'latest')

    const customAxios = useCustomAxios();

    const fetchPosts = async ({ pageParam }) => {
        try {
            const response = await customAxios.get(`/posts?limit=${LIMIT}${pageParam ? `&cursor=${pageParam}` : ''}&sort=${sorting}`);
            return response?.data
        } catch (error) {
            throw error
        }
    }

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
        queryKey: ["posts", sorting],
        queryFn: fetchPosts,
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage?.cursor
    })

    if (error && !isFetching) {
        throw error
    }

    useEffect(() => {
        scroll(0, 0);
    }, []);

    useEffect(() => {
        if (sorting) {
            sessionStorage.setItem('postSort', sorting);
        }
    }, [sorting]);

    useEffect(() => {
        if(inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    return (
        <div className='mx-4 mt-36'>
            <div className='flex justify-between px-2 items-center flex-nowrap gap-y-3'>
                <h1 className='text-3xl sm:text-4xl font-extrabold transition-colors duration-500 ease-in-out dark:text-zinc-200'>
                    {`${(sorting.charAt(0).toUpperCase() + sorting.slice(1))} posts`}
                </h1>

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

            <div className='my-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4'>
                {
                    data.pages.map(page => page.posts.map(post => <Card key={post._id} post={post} />))
                }
            </div>

            <div ref={ref}></div>

            {
                (hasNextPage && isFetching)
                &&
                <div className='text-zinc-950 dark:text-zinc-50'>
                    <Loader className='animate-spin size-8 mx-auto' />
                </div>
            }
        </div>
    )
}

export default Cards