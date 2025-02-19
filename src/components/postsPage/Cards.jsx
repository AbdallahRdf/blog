import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ListFilter, Loader } from 'lucide-react'
import useCustomAxios from '../../hooks/useCustomAxios';
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import Card from './Card'

const FOOTER_HEIGHT = 380;
const LIMIT = 9;

function Cards() {

    const selectSortingRef = useRef(null);

    const [h1Title, setH1Title] = useState('Latest posts');

    const customAxios = useCustomAxios();

    const fetchPosts = async ({ pageParam }) => {
        try {
            const nextCursor = pageParam ? `&cursor=${pageParam}` : '';
            let sort = "";
            if(selectSortingRef.current){
                sort = `&sort=${selectSortingRef.current.value}`;
            }
            else if(localStorage.getItem('postSort')){
                sort = `&sort=${localStorage.getItem('postSort')}`;
            }
            const response = await customAxios.get(`/posts?limit=${LIMIT}${nextCursor}${sort}`);
            setH1Title(`${(selectSortingRef.current) ? (selectSortingRef.current.value.charAt(0).toUpperCase() + selectSortingRef.current.value.slice(1)) : 'Latest'} posts`);
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
        queryKey: ["posts", selectSortingRef?.current?.value],
        queryFn: fetchPosts,
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage?.cursor
    })

    if (error && !isFetching) {
        throw error
    }

    useEffect(() => {
        if (selectSortingRef.current) {
            selectSortingRef.current.value = localStorage.getItem('postSort') ?? 'latest';
        }
        scroll(0, 0);
    }, []);

    useEffect(() => {
        if (selectSortingRef.current) {
            localStorage.setItem('postSort', selectSortingRef.current.value);
        }
    }, [selectSortingRef.current?.value])

    useEffect(() => {
        // handles infinite scroll
        const handleScroll = () => {
            // if it is fetching (a request is already sent) or cursor.current is null (there is not more posts to get)
            if (isFetchNextPage || !hasNextPage) return;

            const { clientHeight, scrollHeight, scrollTop } = document.scrollingElement;

            // if we reach the bottom, no getting posts request is pending, and there is more posts (cursor.current !== null)
            if ((clientHeight + scrollTop >= scrollHeight - FOOTER_HEIGHT)) {
                fetchNextPage();
            }
        }

        document.addEventListener('scroll', handleScroll);

        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='mx-4 mt-36'>
            <div className='flex justify-between px-2 items-center flex-nowrap gap-y-3'>
                <h1 className='text-3xl sm:text-4xl font-extrabold transition-colors duration-500 ease-in-out dark:text-zinc-200'>
                    {h1Title}
                </h1>

                <div className='flex items-center transition-colors duration-500 ease-in-out dark:text-zinc-200'>
                    <label htmlFor='sort' className=''>
                        <ListFilter className='inline size-5 sm:size-6' />
                    </label>
                    <select onChange={refetch} ref={selectSortingRef} className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer transition-colors duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50'>
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