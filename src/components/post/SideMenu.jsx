import { TableOfContents } from 'lucide-react'
import React from 'react'
import PostTag from './PostTag'
import userAvatar from '../../assets/img/user-avatar.svg'

function SideMenu({ headers, tags, isItOnTheSide = true }) {
    const tagsToShow = tags
        .split(' ')
        .filter(tag => tag.trim() !== "")
        .map((tag, index) => <PostTag key={index} tag={tag} />);

    const headersToShow = headers.map(header => {
        if (header.type === "H2") {
            return (
                <li key={header.id}>
                    <a href={`#${header.id}`} className="inline-block hover:underline mb-1">{header.content}</a>
                </li>
            )
        }
        return (
            <ul className='list-dis' key={header.id}>
                <li className='ms-6'>
                    <a href={`#${header.id}`} className="inline-block hover:underline mb-1">{header.content}</a>
                </li>
            </ul>
        )
    })

    return (
        <div className={`${isItOnTheSide ? 'hidden lg:flex lg:flex-col lg:gap-y-6 lg:w-80' : 'flex flex-col gap-y-6 min-w-80 lg:hidden mt-6'}`}>

            <div className='p-4 rounded-xl border border-slate-700'>
                <p className='text-sm text-slate-400 mb-2'>Author</p>
                <div className='flex flex-wrap gap-x-2'>
                    <img src={userAvatar} alt="user-avatar" className='border-2 rounded-xl' />
                    <div>
                        <p className='text-lg font-semibold'>Abdallah Radfi</p>
                        <p className='text-base font-light'>@Username</p>
                    </div>
                </div>
            </div>

            <div className='lg:sticky lg:z-10 lg:top-28'>
                <div className='p-4 rounded-xl border border-slate-700 mb-6'>
                    <p className='text-lg font-semibold mb-2'>Tags</p>
                    <div className='flex flex-wrap gap-1'>
                        {tagsToShow}
                    </div>
                </div>

                <div className='p-4 rounded-xl border border-slate-700'>
                    <div className='flex items-center gap-3 mb-3'>
                        <TableOfContents color="#ffffff" />
                        <small className='text-lg font-semibold'>Table of contents</small>
                    </div>
                    <ol className='mx-4 text-sm sm:text-base'>
                        {headersToShow}
                    </ol>
                </div>
            </div>


        </div>
    )
}

export default SideMenu