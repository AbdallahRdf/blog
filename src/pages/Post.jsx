import React, { Suspense, useEffect } from 'react'
import PostSection from '../components/post/PostSection'
import RetryBtn from '../components/commun/RetryBtn'
import PostSkeleton from '../components/skeletons/PostSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';

function Post() {

    const { reset } = useQueryErrorResetBoundary()

    const queryClient = useQueryClient()

    useEffect(() => {
        scroll(0, 0);
    }, []);

    return (
        <div className='mt-16'>
            <ErrorBoundary
                onReset={() => {
                    reset();
                    queryClient.invalidateQueries({ queryKey: ["post"] });
                }}
                fallbackRender={({ resetErrorBoundary }) => <RetryBtn label='Unable to load post' onClick={() => resetErrorBoundary()} paddingY='py-36' />}
            >
                <Suspense fallback={<PostSkeleton />} >
                    <PostSection />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default Post