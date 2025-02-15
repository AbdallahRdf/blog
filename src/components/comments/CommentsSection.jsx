import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CommentBox from './CommentBox'
import CommentFrom from './CommentFrom';
import useCustomAxios from '../../hooks/useCustomAxios';
import { ListFilter, Loader } from 'lucide-react';
import RetryBtn from '../commun/RetryBtn';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/contexts';
import { formatNumber } from '../../utils/formatter';

// number of comments to fetch
const LIMIT = 14;

function CommentsSection({ post }) {

    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState(null);
    const [showRetryBtn, setShowRetryBtn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const cursorRef = useRef(null);
    const selectSortingRef = useRef(null);

    const customAxios = useCustomAxios();

    const navigator = useNavigate();

    const fetchComments = useCallback(async () => {
        showRetryBtn && setShowRetryBtn(false) // if retry button is visible then hide it;

        const cursor = cursorRef.current ? `&cursor=${cursorRef.current}` : '';
        const sort = selectSortingRef.current ? `&sort=${selectSortingRef.current.value}` : '';
        try {
            const response = await customAxios.get(`/posts/${post._id}/comments?limit=${LIMIT}${cursor}${sort}`);
            setComments(response.data.comments);
            cursorRef.current = response.data.cursor;
        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_NETWORK') {
                setShowRetryBtn(true);
            } else if (error.response) {
                const state = {};
                if (error.response.status === 404) {
                    state.statusCode = 404;
                    state.message = "Not found";
                } else {
                    state.statusCode = 500;
                    state.message = "Server Error"
                }

                navigator(`/${state.message.split(' ').join('-')}`, state);
            }
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        if (post.comments) { // if the post have comments then fetch them
            fetchComments();
        } else {
            setComments([]); // else set comments to an empty array
            setIsFetching(false)
        }
    }, []);

    // fetch comments all over again with the selected sort (top, latest, oldest)
    const handleChange = () => {
        cursorRef.current = null;
        setComments([]);
        fetchComments();
    }

    return (
        <div className='mt-8 border-t border-slate-700'>
            <div className="mx-3 xl:mx-0">
                <div className='flex justify-between px-2'>
                    <p id='comments' className='transition-colors duration-500 ease-in-out mt-6 mb-2 sm:mb-8 text-2xl md:text-3xl text-slate-900 dark:text-slate-100'>
                        Comments {`(${formatNumber(post.comments)})`}
                    </p>
                    <div className='flex items-center transition-colors duration-500 ease-in-out dark:text-zinc-200'>
                        <label htmlFor='sort' className=''>
                            <ListFilter className='inline size-5 sm:size-6' />
                        </label>
                        <select
                            ref={selectSortingRef}
                            onChange={handleChange}
                            className='py-1 ps-1 sm:ps-2 pe-2 bg-transparent text-mg sm:text-lg cursor-pointer transition-colors duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50'
                        >
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='top'>Top</option>
                        </select>
                    </div>
                </div>

                {user && <CommentFrom postId={post._id} fetchComments={fetchComments} />}

                {
                    isFetching
                    &&
                    <div className='text-zinc-950 dark:text-zinc-50 mt-16 mb-14'>
                        <Loader className='animate-spin size-8 mx-auto' />
                    </div>
                }
                {showRetryBtn && <RetryBtn label='Unable to load comments' retry={fetchComments} paddingY='py-36' />}
                {
                    (comments && comments.length > 0)
                    &&
                    comments.map(comment => <CommentBox key={comment._id} comment={comment} postId={post._id} />)
                }
                {
                    (comments && comments.length === 0)
                    &&
                    <div className='transition-colors duration-500 ease-in-out text-slate-900 dark:text-slate-100 text-lg md:text-2xl text-center my-20'>No Comments</div>
                }
            </div>
        </div>
    )
}

export default CommentsSection