import React, { useEffect, useRef, useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import useCustomAxios from '../../hooks/useCustomAxios';

function ReplyForm({ replyToUser, setShowReplyForm, fetchReplies, postId, commentId, replyId = null }) {

    const customAxios = useCustomAxios();

    console.log(replyToUser);
    
    const textareaRef = useRef(null);

    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleCancel = () => setShowReplyForm(false);

    // adjust the height of the textarea based on the content and check if the textarea is empty or not to enable or disable the submit button
    const handleChange = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            if(textareaRef.current.value.trim() !== ''){
                setError(null);
                setIsDisabled(false);
            } else {
                setError('Comment text is required');
                setIsDisabled(true);
            }
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = textareaRef.current.value.trim();
        if(data === ''){
            setError('Comment text is required');
            return;
        }
        
        try {
            await customAxios.post(`/posts/${postId}/comments/${commentId}/replies`, { body: data });
            fetchReplies();
            textareaRef.current.value = "";
        } catch (error) {
            console.log(error);
        }
    }

    // set the replyToUser username in the textarea and focus on it
    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.value = `${replyToUser.username} `;
            textareaRef.current.focus()
        }
    }, []);

    return (
        <form onSubmit={handleFormSubmit} className='ms-8 md:ms-12 my-4'>
            <div className='flex items-center gap-3'>
                <button>
                    <CircleUserRound className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-600 dark:text-zinc-200' />
                </button>
                <textarea
                    ref={textareaRef}
                    onChange={handleChange}
                    className='transition-colors duration-500 ease-in-out resize-none text-lg bg-transparent border-b border-slate-400 focus:border-b dark:focus:border-slate-50 focus:border-slate-700 w-full focus:outline-none text-zinc-800 dark:text-zinc-100'
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