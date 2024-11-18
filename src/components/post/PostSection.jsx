import React from 'react'
import { formatDate } from '../../utils/dateFormatter';
import PostTitle from './PostTitle';
import PostPublishDate from './PostPublishDate';
import PostCover from './PostCover';
import InteractionBar from './InteractionBar';
import SideMenu from './SideMenu';
import PostBody from './PostBody';
import PostDescription from './PostDescription';

function PostSection({ post }) {
    const postedAt = formatDate(post.createdAt);

    return (
        <div className='w-full xl:w-[1280px] mx-auto pt-32 pb-24 px-2 scroll-smooth'>
            <PostTitle title={post.title} />

            <PostPublishDate date={postedAt} />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <PostCover coverPath={post.cover} />

                    <InteractionBar />

                    <PostDescription description={post.description} />

                    <SideMenu author={post.author} headers={post.headers} tags={post.tags} isItOnTheSide={false} />

                    <PostBody postContent={post.content} />
                </div>
                <SideMenu author={post.author} headers={post.headers} tags={post.tags}  />
            </div>
        </div>
    )
}

export default PostSection