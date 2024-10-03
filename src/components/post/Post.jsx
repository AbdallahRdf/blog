import React from 'react'
import SideMenu from './SideMenu'
import PostBody from './PostBody'

function Post() {
    return (
        <>
            <h1 className='text-4xl md:text-6xl font-bold'>This is the end of 2025, explore now!</h1>
            <p className='text-slate-400 text-lg my-6'>FEB 10, 2024</p>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className='w-full lg:max-w-4xl'>
                    <img className='w-full lg:max-w-4xl h-fit rounded-3xl mb-12' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.b7pX53-YGRddIVqSE8qDAAHaEK%26pid%3DApi&f=1&ipt=8c387e015047a58bed7a000221d640917d873fce46f468d26fcc13d931ad05aa&ipo=images" alt="Blog post image" />
                    <SideMenu isItOnTheSide={false} />
                    <PostBody />
                </div>
                <SideMenu />
            </div>
        </>
    )
}

export default Post