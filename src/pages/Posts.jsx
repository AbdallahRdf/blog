import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query'
import CardsSkeleton from '../components/skeletons/CardsSkeleton'
import Cards from '../components/postsPage/Cards'
import RetryBtn from '../components/commun/RetryBtn'

function Posts() {

  const { reset } = useQueryErrorResetBoundary();

  const queryClient = useQueryClient()

  return (
    <ErrorBoundary
      onReset={() => {
        reset();
        queryClient.invalidateQueries({ queryKey: ["posts"] }); 
      }}
      fallbackRender={({ resetErrorBoundary }) => <RetryBtn label='Unable to load posts' onClick={() => resetErrorBoundary()} paddingY='py-64'/>}
    >
      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Posts