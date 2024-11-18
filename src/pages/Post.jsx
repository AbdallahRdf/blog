import React, { useCallback, useEffect, useState } from 'react'
import CommentsSection from '../components/post/CommentsSection'
import { useNavigate, useParams } from 'react-router-dom'
import PostSection from '../components/post/PostSection'
import useCustomAxios from '../hooks/useCustomAxios';
import RetryBtn from '../components/commun/RetryBtn'
import PostSkeleton from '../components/skeletons/PostSkeleton';

function Post() {

    const { slug } = useParams();

    const navigator = useNavigate();

    const [post, setPost] = useState(null);
    const [showRetryBtn, setShowRetryBtn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const customAxios = useCustomAxios();

    const fetchPost = useCallback(async () => {
        showRetryBtn && setShowRetryBtn(false) // if retry button is visible then hide it;

        try {
            const response = await customAxios.get(`/posts/${slug}`);
            console.log(response);
            setPost(response.data);
        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_NETWORK') {
                setShowRetryBtn(true);
            } else if (error.response) {
                const state = {};
                if(error.response.status === 404){
                    state.statusCode = 404;
                    state.message = "Page not found";
                } else {
                    state.statusCode = 500;
                    state.message = "Server Error"
                }
                
                navigator(`/${state.message.split(' ').join('-')}`, state);
            }
        } finally {
            setIsFetching(false);
        }
    });

    useEffect(() => {
        scroll(0, 0);
        fetchPost();
    }, []);

    return (
        <div className='mt-16'>
            {post && <PostSection post={post} />}
            {isFetching && <PostSkeleton />}
            {showRetryBtn && <RetryBtn label='Unable to load posts' retry={fetchPost} paddingY='py-36' />}
            {post && <CommentsSection post={post} />}
        </div>
    )
}

export default Post