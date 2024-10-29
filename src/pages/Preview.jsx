import React from 'react'
import PostTitle from '../components/post/PostTitle'
import PostPublishDate from '../components/post/PostPublishDate'
import InteractionBar from '../components/post/InteractionBar'
import PostDescription from '../components/post/PostDescription'
import SideMenu from '../components/post/SideMenu'
import PostBody from '../components/post/PostBody'
import PostCover from '../components/post/PostCover'
import { ArrowBigLeft } from 'lucide-react'

function Preview({ setShowPreviewMode, formValues: { title, cover, description, tags, content }, postBody, headers }) {

    return (
        <div className='w-full xl:w-[1280px] mx-auto mt-32 mb-24 px-4'>
            <PostTitle>{title}</PostTitle>

            <PostPublishDate>FEB 10, 2024</PostPublishDate>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <PostCover url={URL.createObjectURL(cover[0])} />

                    <InteractionBar />

                    <PostDescription description={description} />

                    <SideMenu headers={headers} tags={tags} isItOnTheSide={false} />

                    <PostBody content={content} postBody={postBody} />
                </div>
                <SideMenu headers={headers} tags={tags} />
            </div>
            <button
                className='fixed bottom-3 md:bottom-6 left-4 p-1 bg-lime-500 hover:bg-lime-400 rounded-full'
                onClick={() => setShowPreviewMode(false)}
            >
                <ArrowBigLeft className='size-7 sm:size-9' />
            </button>
        </div>
    )
}

export default Preview