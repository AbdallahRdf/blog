import React, { useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Search } from 'lucide-react';

function Layout() {

    const { pathname } = useLocation();

    const [showSearchBlock, setShowSearchBlock] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const tagsListRef = useRef(null);

    const handleSearchClick = () => setShowSearchBlock(prev => !prev);

    const handleClick = () => {
        if (tagsListRef.current) {
            console.log(tagsListRef.current.style.flexWrap)
            if (tagsListRef.current.style.flexWrap === "nowrap") {
                tagsListRef.current.style.flexWrap = "wrap";
                setShowAllTags(true);
            } else {
                tagsListRef.current.style.flexWrap = "nowrap";
                setShowAllTags(false);
            }
        }
    }

    return (
        (pathname !== "/login" && pathname !== "/signup" && pathname !== "/posts/new")
            ?
            <div className='flex flex-col min-h-screen w-full'>
                <div className='w-full xl:w-[1280px] mx-auto relative flex-1'>
                    <Navbar handleSearchClick={handleSearchClick} />

                    {
                        showSearchBlock
                        &&
                        <div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className='mt-28 w-full py-2 rounded-lg px-2'
                        >
                            <form className='flex mb-5'>
                                <input
                                    type="search"
                                    placeholder='Search...'
                                    className='w-full bg-zinc-800 py-3 ps-4 pe-12 text-lg rounded-s-xl focus:outline-none focus:ring-2 focus:ring-purple-600'
                                />
                                <button type="submit" className='px-4 py-3 bg-purple-800 hover:bg-purple-600 rounded-e-xl'>
                                    <Search />
                                </button>
                            </form>
                            <div>
                                <h4 className='text-lg sm:text-2xl mb-2'>Filter by tags</h4>
                                <ul
                                    ref={tagsListRef}
                                    className='bg-zinc-900 rounded-xl flex gap-3 sm:gap-4 text-xs sm:text-lg overflow-auto pb-3 pt-1 px-2'
                                    style={{ flexWrap: "nowrap" }}
                                >
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#programming</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#javascript</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#networking</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#backend</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#react</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#frontend</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#backend</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#typescipt</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#communication</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#coding</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#hardware</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#webDev</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#vscode</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#fullstack</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#styles</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#html</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#IT</li>
                                    <li className='text-purple-400 hover:bg-slate-800 p-1 rounded-lg cursor-pointer'>#cisco</li>
                                </ul>
                                <button onClick={handleClick} className='text-end w-full py-2 px-4 underline hover:no-underline'>
                                    {
                                        showAllTags
                                            ?
                                            "Show less"
                                            :
                                            "Show all tags"
                                    }
                                </button>
                            </div>
                        </div>
                    }

                    <main className={`px-4 mx-auto ${!showSearchBlock && "mt-36"}`} >
                        <Outlet />
                    </main>

                </div>
                <Footer />
            </div>
            :
            <Outlet />
    )
}

export default Layout