import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import useToast from '../../hooks/useToast';
import useCustomAxios from '../../hooks/useCustomAxios';
import { toast } from 'react-toastify';

function UpdateModal({ closeEditModal, postId, commentId, commentText, replyId = null, replyUsername = null }) {

    const queryClient = useQueryClient();

    const { showToast } = useToast();

    const customAxios = useCustomAxios();

    const [comment, setComment] = useState(commentText);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleReplyChange = (e) => {
        const value = e.target.value;
        if (value === commentText) {
            setError('No changes detected');
            !isDisabled && setIsDisabled(true);
        }
        if (value.trim() === "" || value.trim() === replyUsername) {
            setError('Comment text is required');
            !isDisabled && setIsDisabled(true);
            setComment(replyUsername + " ");
        }
        else if (!value.includes(replyUsername)) {
            setError('You cannot remove the mentioned person from your reply');
        }
        else {
            error && setError(null);
            isDisabled && setIsDisabled(false);
            setComment(value);
        }
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        setComment(value);
        if (value.trim() === commentText) {
            setError('No changes detected');
            !isDisabled && setIsDisabled(true);
        }
        else if (value.trim() === "") {
            setError('Comment text is required');
            !isDisabled && setIsDisabled(true);
        }
        else {
            error && setError(null);
            isDisabled && setIsDisabled(false);
        }
    }

    const { mutateAsync } = useMutation({
        mutationFn: async ({ updatedComment }) => {
            // update comment or reply
            await customAxios.patch(`/posts/${postId}/comments/${commentId}${replyId ? `/replies/${replyId}` : ''}`, { body: updatedComment });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(replyId ? ['replies', postId, commentId] : ['comments', postId]);
            showToast('Comment updated successfully', toast.success);
        },
        onError: () => {
            showToast('Oops! Something went wrong while updating your comment. Please try again.', toast.error);
        }
    })

    const handleSave = async () => {
        closeEditModal();
        await mutateAsync({ updatedComment: comment });
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
            <div className='text-black dark:text-white bg-neutral-100 dark:bg-zinc-900 mx-4 px-2 py-4 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                <div className='mb-4'>
                    <textarea
                        value={comment}
                        onChange={replyId ? handleReplyChange : handleCommentChange}
                        placeholder='Write a comment...'
                        className='p-4 overflow-hidden rounded-xl w-full bg-neutral-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:border-zinc-400 focus:outline-none resize-y'
                    ></textarea>
                    {
                        error
                        &&
                        <small className='transition-colors duration-500 ease-in-out text-red-500 dark:text-red-400 text-sm md:text-base'>{error}</small>
                    }
                </div>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={closeEditModal}
                        className='transition-all duration-500 ease-in-out py-2 px-4 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-300 text-zinc-950 font-bold cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isDisabled}
                        onClick={handleSave}
                        className={`transition-all duration-500 ease-in-out py-2 px-4 rounded-lg ${isDisabled ? "bg-green-300 dark:bg-green-400 cursor-not-allowed" : "bg-green-600 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600 cursor-pointer"} text-zinc-50 font-bold`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal