import React from 'react'

function UpdateModal({ open, closeEditModal }) {
    if (!open) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-20 z-50 flex justify-center items-center">
            <div className='text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 mx-4 p-4 sm:p-6 rounded-xl'>
                <h2 className='mb-3 sm:mb-4'>Are you sure you want to delete this comment? This action cannot be undone.</h2>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={closeEditModal}
                        className='transition-all duration-500 ease-in-out py-2 px-4 rounded-lg bg-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-100 text-zinc-950 font-bold cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        className='transition-all duration-500 ease-in-out py-2 px-4 rounded-lg bg-red-600 dark:bg-red-900 hover:bg-red-500 dark:hover:bg-red-700 text-zinc-50 font-bold cursor-pointer'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal