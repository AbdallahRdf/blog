import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LayoutWithoutNavbar() {

    return (
        <>
            <ToastContainer limit={1} />

            <div className='transition-all duration-500 ease-in-out bg-zinc-50 dark:bg-zinc-950'>
                <Outlet />
            </div>
        </>
    )
}

export default LayoutWithoutNavbar;