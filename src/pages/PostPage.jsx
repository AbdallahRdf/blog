import React from 'react'
import PostTitle from '../components/post/PostTitle'
import PostPublishDate from '../components/post/PostPublishDate'
import InteractionBar from '../components/post/InteractionBar'
import PostDescription from '../components/post/PostDescription'
import SideMenu from '../components/post/SideMenu'
import PostBody from '../components/post/PostBody'
import CommentsSection from '../components/post/CommentsSection'
import PostCover from '../components/post/PostCover'

function PostPage() {
    return (
        <>
            <PostTitle>This is the end of 2025, explore now!</PostTitle>

            <PostPublishDate>FEB 10, 2024</PostPublishDate>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <PostCover url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.b7pX53-YGRddIVqSE8qDAAHaEK%26pid%3DApi&f=1&ipt=8c387e015047a58bed7a000221d640917d873fce46f468d26fcc13d931ad05aa&ipo=images"/>

                    <InteractionBar/>

                    <PostDescription description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, veniam. Et consequatur unde sunt enim natus. Maiores, est illum? Aperiam sint unde fugit inventore blanditiis iusto harum ullam asperiores facere!" />

                    <SideMenu isItOnTheSide={false} />
                    
                    <PostBody />
                </div>
                <SideMenu />
            </div>
            <CommentsSection />
        </>
    )
}

export default PostPage