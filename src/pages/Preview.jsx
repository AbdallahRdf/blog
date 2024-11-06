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

    const tagsArray = tags
        .split(' ')
        .filter(tag => tag.trim() !== "");

    return (
        <div className='w-full xl:w-[1280px] mx-auto pt-32 pb-24 px-2 scroll-smooth'>
            <PostTitle>{title}</PostTitle>

            <PostPublishDate>FEB 10, 2024</PostPublishDate>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <PostCover url={URL.createObjectURL(cover[0])} />

                    <InteractionBar />

                    <PostDescription description={description} />

                    <SideMenu headers={headers} tags={tagsArray} isItOnTheSide={false} />

                    <PostBody content={content} postBody={postBody} />
                </div>
                <SideMenu headers={headers} tags={tagsArray} />
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