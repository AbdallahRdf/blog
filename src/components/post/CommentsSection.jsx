import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommentBox from './CommentBox'
import CommentFrom from './CommentFrom';
import useCustomAxios from '../../hooks/useCustomAxios';
import { Loader } from 'lucide-react';
import RetryBtn from '../commun/RetryBtn';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/contexts';

function CommentsSection({ post }) {

    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState(null);
    const [showRetryBtn, setShowRetryBtn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const customAxios = useCustomAxios();

    const navigator = useNavigate();

    const fetchComments = useCallback(async () => {
        showRetryBtn && setShowRetryBtn(false) // if retry button is visible then hide it;

        try {
            const response = await customAxios.get(`/posts/${post._id}/comments`);
            console.log(response);
            setComments(response.data);
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
        if (post.comments) {
            fetchComments();
        } else {
            setComments([]);
            setIsFetching(false)
        }
    }, [])

    return (
        <div className='mt-8 border-t border-slate-700'>
            <div className="mx-3 xl:mx-0">
                <p id='comments' className='transition-colors duration-500 ease-in-out mt-5 mb-8 text-2xl md:text-3xl text-slate-900 dark:text-slate-100'>
                    Comments {post.comments ? '' : `(${post.comments})`}
                </p>

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
                    comments.map(comment => <CommentBox key={comment._id} comment={comment} />)
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