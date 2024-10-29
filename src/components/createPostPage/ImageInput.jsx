import { Trash } from 'lucide-react';
import React, { useId } from 'react'

function ImageInput({ blockData, error, deleteBlock, handleBlockChange }) {

    const { id, value } = blockData;

    const fileInputId = useId();

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleBlockChange(id, file)
    }

    return (
        <div id={id} className='flex flex-col mb-8 mt-6 px-3 relative'>
            <button type='button' onClick={deleteBlock} title='Delete Block' className='absolute top-1 right-4 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-600 p-2 rounded-full'>
                <Trash className='size-5 sm:size-6' />
            </button>
            <label htmlFor={fileInputId} className='text-base sm:text-lg text-center cursor-pointer text-slate-200 w-full bg-transparent ring-1 ring-zinc-600 hover:ring-zinc-300 hover:text-slate-50 py-2 sm:py-3 px-12 rounded-xl'>Import Image</label>
            <input
                onChange={handleChange}
                type='file'
                accept='image/jpeg, image/jpg, image/png'
                id={fileInputId}
                className='hidden'
            />
            {value instanceof File && <img src={URL.createObjectURL(value)} alt='image' className='my-4 w-fit mx-auto rounded-lg' />}
            {error && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{error.message}</small>}
        </div>
    )
}

export default ImageInput