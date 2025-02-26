import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import useCustomAxios from '../../hooks/useCustomAxios';
import useToast from '../../hooks/useToast';
import { toast } from 'react-toastify';

function DeleteModal({ closeDeleteModal, postId, commentId, replyId = null }) {

    const queryClient = useQueryClient();

    const { showToast } = useToast();

    const customAxios = useCustomAxios();

    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            // delete comment or reply
            await customAxios.delete(`/posts/${postId}/comments/${commentId}${replyId ? `/replies/${replyId}` : ''}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(replyId ? ['replies', postId, commentId] : ['comments', postId]);
            showToast('Comment deleted successfully', toast.success);
        },
        onError: () => {
            showToast('Oops! We couldn\'t delete the comment. Please try again.', toast.error);
        }
    })

    const deleteComment = async () => {
        closeDeleteModal();
        await mutateAsync();
    }

    useEffect(() => {
        const trapFocusInTheModal = (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
            }
        }

        window.document.addEventListener("keydown", trapFocusInTheModal);

        return () => window.document.removeEventListener("keydown", trapFocusInTheModal);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-20 z-50 flex justify-center items-center">
            <div className='text-black dark:text-white bg-neutral-100 dark:bg-zinc-900 mx-4 p-4 sm:p-6 rounded-xl'>
                <h2 className='mb-3 sm:mb-4'>Are you sure you want to delete this comment? This action cannot be undone.</h2>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={closeDeleteModal}
                        className='transition-all duration-500 ease-in-out py-2 px-4 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-100 text-zinc-950 font-bold cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteComment}
                        className='transition-all duration-500 ease-in-out py-2 px-4 rounded-lg bg-red-600 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 text-zinc-50 font-bold cursor-pointer'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal