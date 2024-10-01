import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
    return (
        <div className='lg:w-8/12 mx-auto relative'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout