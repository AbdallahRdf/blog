import { SquareUser, TableOfContents } from 'lucide-react'
import React from 'react'
import PostTag from './PostTag'

function SideMenu({isItOnTheSide = true}) {
    return (
        <div className={`${isItOnTheSide ? 'hidden lg:flex lg:flex-col lg:gap-y-6 lg:min-w-80' : 'flex flex-col gap-y-6 min-w-80 lg:hidden mt-6'}`}>

            <div className='p-4 rounded-xl border border-slate-700'>
                <p className='text-sm text-slate-400 mb-2'>Author</p>
                <div className='flex flex-wrap gap-x-2'>
                    <SquareUser color="#ffffff" size={48} />
                    <div>
                        <p className='text-lg font-semibold'>Abdallah Radfi</p>
                        <p className='text-md font-light'>@Username</p>
                    </div>
                </div>
            </div>

            <div className='lg:sticky lg:z-10 lg:top-28'>
                <div className='p-4 rounded-xl border border-slate-700 mb-6'>
                    <p className='text-lg font-semibold mb-2'>Tags</p>
                    <div className='flex flex-wrap gap-1'>
                        <PostTag>#programming</PostTag>
                        <PostTag>#javascriat</PostTag>
                        <PostTag>#node</PostTag>
                        <PostTag>#DS</PostTag>
                        <PostTag>#algorithms</PostTag>
                    </div>
                </div>

                <div className='p-4 rounded-xl border border-slate-700'>
                    <div className='flex items-center gap-3 mb-3'>
                        <TableOfContents color="#ffffff" />
                        <small className='text-lg font-semibold'>Table of contents</small>
                    </div>
                    <ol className='list-decimal mx-4'>
                        <li>
                            <a href="#">The summup of this year</a>
                        </li>
                        <li>
                            <a href="#">Definition of that!</a>
                            <ul className='list-decimal ms-5 me-4'>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Finally how we set it up?</a>
                        </li>
                        <li>
                            <a href="#">Finally how we set it up?</a>
                            <ul className='list-decimal ms-5 me-4'>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                                <li>
                                    <a href="#">That is not</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Finally how we set it up?</a>
                        </li>
                    </ol>
                </div>
            </div>


        </div>
    )
}

export default SideMenu