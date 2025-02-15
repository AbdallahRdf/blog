import React, { useRef, useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import useCustomAxios from '../../hooks/useCustomAxios';

function CommentFrom({ postId, fetchComments }) {

    const customAxios = useCustomAxios();

    const textareaRef = useRef(null);

    const [error, setError] = useState(null);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);

    const handleCancel = () => {
        setError(null);
        setShowSubmitBtn(false);
        textareaRef.current.value = "";
    }

    const handleChange = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            if (textareaRef.current.value.trim() === '') {
                setError('Comment text is required');
                setShowSubmitBtn(false);
            } else {
                setError(null);
                setShowSubmitBtn(true);
            }
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = textareaRef.current.value.trim();
        if (data === '') {
            setError('Comment text is required');
            setShowSubmitBtn(false);
            return;
        }

        try {
            await customAxios.post(`/posts/${postId}/comments`, { body: data });
            fetchComments();
            handleCancel();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className='my-4'>
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
            {
                showSubmitBtn
                &&
                <div className='flex justify-end gap-2 mt-2'>
                    <button
                        onClick={handleCancel}
                        className='transition-colors duration-500 ease-in-out py-2 px-5 text-base sm:text-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-100 rounded-full'
                    >
                        Cancel
                    </button>
                    <input
                        type='submit'
                        value="Comment"
                        className="transition-colors duration-500 ease-in-out py-2 px-3 text-base sm:text-lg bg-purple-500 dark:bg-purple-700 hover:bg-purple-400 dark:hover:bg-purple-600 cursor-pointer rounded-full text-zinc-100"
                    />
                </div>
            }
        </form>
    )
}

export default CommentFrom