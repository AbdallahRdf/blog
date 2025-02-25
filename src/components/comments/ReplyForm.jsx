import React, { useRef, useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import useCustomAxios from '../../hooks/useCustomAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '../../hooks/useToast';
import { toast } from 'react-toastify';

function ReplyForm({ replyUsername, setShowReplyForm, postId, commentId, replyId = null }) {

    const queryClient = useQueryClient();

    const customAxios = useCustomAxios();

    const textareaRef = useRef(null);
    const [replyText, setReplyText] = useState(replyUsername);

    const { showToast } = useToast();

    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleCancel = () => {
        setReplyText(replyUsername);
        setShowReplyForm(false);
    }

    // adjust the height of the textarea based on the content and check if the textarea is empty or not to enable or disable the submit button
    const handleChange = (e) => {
        if (!e.target.value.includes(replyUsername) && e.target.value.trim() !== '') {
            !error && setError('Comment text is required');
            !isDisabled && setIsDisabled(true);
            return;
        }
        error && setError(null);
        isDisabled && setIsDisabled(false);
        e.target.value.trim() !== '' ? setReplyText(e.target.value) : setReplyText(replyUsername);
        
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    const createNewReply = async ({ replyUsername, replyText}) => {
        const response = await customAxios.post(`/posts/${postId}/comments/${commentId}/replies`, { replyId: replyId ?? commentId, replyUsername, body: replyText.trim() });
        return response?.data;
    }

    const { mutateAsync } = useMutation({
        mutationFn: createNewReply,
        onSuccess: () => {
            queryClient.invalidateQueries(["replies", postId, commentId]);
        },
        onError: (error) => {
            showToast("Oops! We couldn't save your comment. Please try again.", toast.error);
        }
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await mutateAsync({ replyUsername, replyText });
            handleCancel();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className='ms-8 md:ms-12'>
            <div className='flex items-start gap-3'>
                <button>
                    <CircleUserRound className='transition-colors duration-500 ease-in-out size-7 md:size-10 text-zinc-600 dark:text-zinc-200' />
                </button>
                <textarea
                    ref={textareaRef}
                    value={replyText}
                    onChange={handleChange}
                    className='transition-colors duration-500 ease-in-out text-sm md:text-lg resize-none bg-transparent border-b border-slate-400 focus:border-b dark:focus:border-slate-50 focus:border-slate-700 w-full focus:outline-none text-zinc-800 dark:text-zinc-100'
                    rows={1}
                    placeholder='Write a comment...'
                ></textarea>
            </div>
            {error && <small className='transition-colors duration-500 ease-in-out text-red-500 dark:text-red-400 text-sm md:text-base ms-10 md:ms-14'>{error}</small>}
            <div className='flex justify-end gap-2 mt-2'>
                <button
                    onClick={handleCancel}
                    className='transition-colors duration-500 ease-in-out py-2 px-5 text-base sm:text-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-100 rounded-full'
                >
                    Cancel
                </button>
                <input
                    type='submit'
                    value="Reply"
                    disabled={isDisabled}
                    className={`transition-colors duration-500 ease-in-out py-2 px-6 text-base sm:text-lg ${isDisabled ? "bg-purple-400 dark:bg-purple-600 cursor-not-allowed" : "bg-purple-500 dark:bg-purple-700 hover:bg-purple-400 dark:hover:bg-purple-600 cursor-pointer"} rounded-full text-zinc-100`}
                />
            </div>
        </form>
    )
}

export default ReplyForm