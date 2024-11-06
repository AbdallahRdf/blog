import { Trash } from 'lucide-react';
import React, { useId } from 'react'
import InputErrorMessage from '../commun/InputErrorMessage';

function ImageInput({ blockData, error, handleDeleteBlock, handleBlockChange }) {

    const { id, value } = blockData;

    const fileInputId = useId();

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleBlockChange(id, file)
    }

    return (
        <div id={id} className='flex flex-col mb-8 mt-6 px-3 relative'>
            <button type='button' onClick={handleDeleteBlock} title='Delete Block' className='absolute top-1 right-4 text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 p-2 rounded-full'>
                <Trash className='size-5 sm:size-6' />
            </button>
            <label htmlFor={fileInputId} className='transition-colors duration-300 ease-in-out text-base sm:text-lg text-center cursor-pointer text-zinc-900 dark:text-slate-200 w-full bg-transparent ring-1 ring-zinc-300 dark:ring-zinc-600 hover:ring-zinc-500 dark:hover:ring-zinc-300 dark:hover:text-slate-50 py-2 sm:py-3 px-12 rounded-xl'>Import Image</label>
            <input
                onChange={handleChange}
                type='file'
                accept='image/jpeg, image/jpg, image/png'
                id={fileInputId}
                className='hidden'
            />
            {value instanceof File && <img src={URL.createObjectURL(value)} alt='image' className='my-4 w-fit mx-auto rounded-lg' />}
            {error && <InputErrorMessage message={error.message} />}
        </div>
    )
}

export default ImageInput