import React from 'react'
import PostTitle from '../components/post/PostTitle'
import PostPublishDate from '../components/post/PostPublishDate'
import InteractionBar from '../components/post/InteractionBar'
import PostDescription from '../components/post/PostDescription'
import SideMenu from '../components/post/SideMenu'
import PostBody from '../components/post/PostBody'
import PostCoverPreviewMode from '../components/newPostPage/PostCoverPreviewMode'
import { ArrowBigLeft } from 'lucide-react'
import postBodyBlocks from '../enums/postBodyBlocks'
import { formatDate } from '../utils/formatter'

function Preview({ setShowPreviewMode, formValues: { title, cover, description, tags, content }, postBody, headers }) {

    const tagsArray = tags
        .split(' ')
        .filter(tag => tag.trim() !== "");

    const postContent = [
        {
            type: postBodyBlocks.EDITOR,
            value: content
        },
        ...postBody
    ];

    const postedAt = formatDate(Date.now().toString());

    const author = {
        fullName: 'John Doe',
        username: 'JDoe',
        profileImage: null
    };

    return (
        <div className='w-full xl:w-[1280px] mx-auto pt-32 pb-24 px-2 scroll-smooth'>
            <PostTitle title={title} />

            <PostPublishDate date={postedAt} />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <PostCoverPreviewMode url={URL.createObjectURL(cover[0])} />

                    <InteractionBar />

                    <PostDescription description={description} />

                    <SideMenu author={author} headers={headers} tags={tagsArray} isItOnTheSide={false} />

                    <PostBody postContent={postContent} />
                </div>
                <SideMenu author={author} headers={headers} tags={tagsArray} />
            </div>
            <button
                title='Back'
                className='fixed bottom-3 md:bottom-6 left-4 p-2 text-slate-50 bg-lime-400 hover:bg-lime-300 rounded-full'
                onClick={() => setShowPreviewMode(false)}
            >
                <ArrowBigLeft className='size-7 sm:size-9' />
            </button>
        </div>
    )
}

export default Preview