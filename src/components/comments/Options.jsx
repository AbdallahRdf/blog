import { Ellipsis, PenBoxIcon, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

function Options({ postId, commentId, commentText, replyId = null }) {
    const [showOptions, setShowOptions] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setShowOptions(false);
        document.body.style.overflow = "hidden";
        document.body.style.userSelect = "none";
    }

    const openDeleteModel = (e) => {
        openModal(e);
        setShowDeleteModal(true);
    };

    const openEditModal = (e) => {
        openModal(e);
        setShowEditModal(true);
    }

    const closeDeleteModal = (e) => {
        setShowDeleteModal(false);
        document.body.style.overflow = "auto";
        document.body.style.userSelect = "auto";
    };

    const closeEditModal = (e) => {
        setShowEditModal(false);
        document.body.style.overflow = "auto";
        document.body.style.userSelect = "auto";
    };

    const toggleOptions = (e) => {
        e.stopPropagation();
        setShowOptions(prev => !prev);
    };

    useEffect(() => {
        const handleClick = (e) => showOptions && setShowOptions(false);

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [showOptions]);

    return (
        <>
            <button
                onClick={toggleOptions}
                className='transition-colors duration-500 ease-in-out text-zinc-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full p-1 m-1 absolute top-0 right-0'
            >
                <Ellipsis className="size-4 md:size-5 inline" />
            </button>
            {
                showOptions
                &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className='transition-all duration-500 ease-in-out absolute right-7 sm:right-9 top-4 sm:top-5 flex flex-col bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded-xl w-fit overflow-hidden'
                >
                    <button
                        openEditModal={openEditModal}
                        className='transition-all duration-500 ease-in-out py-2 px-6 flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
                    >
                        <PenBoxIcon className='inline size-4 sm:size-5' />
                        edit
                    </button>
                    <button
                        onClick={openDeleteModel}
                        className='transition-all duration-500 ease-in-out py-2 px-6 flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white'
                    >
                        <Trash className='inline size-4 sm:size-5' />
                        delete
                    </button>
                </motion.div>
            }

            {
                showDeleteModal
                &&
                <DeleteModal
                    open={showDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    postId={postId}
                    commentId={commentId}
                    replyId={replyId}
                />
            }

            {
                showEditModal
                &&
                <UpdateModal
                    open={showEditModal}
                    closeEditModal={closeEditModal}
                />
            }
        </>
    )
}

export default Options