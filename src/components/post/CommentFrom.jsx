import React, { useContext, useRef } from 'react'
import { CircleUserRound } from 'lucide-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCustomAxios from '../../hooks/useCustomAxios';
import { AuthContext } from '../../context/contexts';

const schema = yup.object().shape({
    comment: yup
        .string('Invalid Comment')
        .trim()
        .required('Comment text is required')
});

function CommentFrom({ postId, fetchComments }) {

    const { user } = useContext(AuthContext);

    const customAxios = useCustomAxios();

    const textareaRef = useRef(null);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (data) => {
        try {
            await customAxios.post(`/posts/${postId}/comments`, { body: data.comment });
            fetchComments();
        } catch (error) {
            log(error);
        }
    }

    console.log(errors);


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex items-center gap-3'>
                <button>
                    <CircleUserRound className='transition-colors duration-500 ease-in-out size-9 md:size-12 text-zinc-600 dark:text-zinc-200' />
                </button>
                <textarea
                    ref={textareaRef}
                    onChange={handleInput}
                    className='transition-colors duration-500 ease-in-out resize-none text-lg bg-transparent border-b border-slate-400 focus:border-b dark:focus:border-slate-50 focus:border-slate-700 w-full focus:outline-none text-zinc-800 dark:text-zinc-100'
                    rows={1}
                    placeholder='Write a comment...'
                    {...register('comment')}
                ></textarea>
            </div>
            {errors?.comment && <small className='transition-colors duration-500 ease-in-out text-red-500 dark:text-red-400 text-sm md:text-base ms-10 md:ms-14'>{errors.comment.message}</small>}
            <div className='flex justify-end gap-2 mt-2'>
                <button className='transition-colors duration-500 ease-in-out py-2 px-5 text-base sm:text-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-zinc-800 dark:text-zinc-100 rounded-full'>Cancel</button>
                <input type='submit' value="Comment" className='transition-colors duration-500 ease-in-out py-2 px-3 text-base sm:text-lg bg-purple-500 dark:bg-purple-700 hover:bg-purple-400 dark:hover:bg-purple-600 rounded-full cursor-pointer text-zinc-100' />
            </div>
        </form>
    )
}

export default CommentFrom