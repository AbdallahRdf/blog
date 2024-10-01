import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
    return (
        <div className='flex flex-col min-h-screen w-screen'>
            <div className='w-full xl:w-8/12 mx-auto relative flex-1'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout