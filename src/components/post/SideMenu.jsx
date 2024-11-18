import { TableOfContents, User } from 'lucide-react'
import React, { useEffect } from 'react'
import PostTag from './PostTag'
import AuthorCard from './AuthorCard';

const NAVBAR_HEIGHT = 100;

function SideMenu({ author, headers, tags, isItOnTheSide = true }) {
    const tagsToShow = tags.map((tag, index) => <PostTag key={index} tag={tag} />);

    const headersToShow = headers.map(header => {
        if (header.type === "H2") {
            return (
                <li key={header.id}>
                    <a href={`#${header.id}`} className="inline-block hover:underline mb-1">{header.value}</a>
                </li>
            )
        }
        return (
            <ul className='list-dis' key={header.id}>
                <li className='ms-6'>
                    <a href={`#${header.id}`} className="inline-block hover:underline mb-1">{header.value}</a>
                </li>
            </ul>
        )
    })

    // enable smooth scrolling on anchor links (<a> tags) that reference elements on the same page
    useEffect(() => {
        const handleScroll = function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1); // Remove the '#' from the href

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - NAVBAR_HEIGHT,
                    behavior: 'smooth'
                });
            }
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleScroll);
        });

        return () => document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.removeEventListener('click', handleScroll);
        });

    }, []);

    return (
        <div className={`${isItOnTheSide ? 'hidden lg:flex lg:flex-col lg:gap-y-6 lg:w-80' : 'flex flex-col gap-y-6 min-w-80 lg:hidden mt-6'}`}>

            <AuthorCard author={author} />

            <div className='lg:sticky lg:z-10 lg:top-28'>
                <div className='transition-colors duration-500 ease-in-out p-4 rounded-xl border border-slate-400 dark:border-slate-700 mb-6'>
                    <p className='transition-colors duration-500 text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-100'>Tags</p>
                    <div className='flex flex-wrap gap-1'>
                        {tagsToShow}
                    </div>
                </div>

                <div className='transition-colors duration-500 ease-in-out p-4 rounded-xl border border-slate-400 dark:border-slate-700 text-zinc-800 dark:text-zinc-100'>
                    <div className='flex items-center gap-3 mb-3'>
                        <TableOfContents />
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