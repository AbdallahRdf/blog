import { Outlet } from 'react-router-dom'

function LayoutWithoutNavbar() {

    return (
        <div className='transition-all duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950'>
            <Outlet />
        </div>
    )
}

export default LayoutWithoutNavbar;