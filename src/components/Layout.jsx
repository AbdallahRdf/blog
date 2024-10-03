import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
    return (
        <div className='flex flex-col min-h-screen w-full'>
            <div className='w-full xl:w-[1280px] mx-auto relative flex-1'>
                <Navbar />
                <main className='px-4 mx-auto mt-36' >
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Layout