import React from 'react'
import InputErrorMessage from '../commun/InputErrorMessage'

function FormSectionWithFileInput({ label, id, file, error, register }) {
    return (
        <div className='flex flex-col mb-6 mt-10 px-3'>
            <label htmlFor={id} className='transition-colors duration-300 ease-in-out text-base sm:text-lg text-center cursor-pointer text-zinc-900 dark:text-slate-200 w-full bg-transparent ring-1 ring-zinc-300 dark:ring-zinc-600 hover:ring-zinc-500 dark:hover:ring-zinc-300 dark:hover:text-slate-50 py-2 sm:py-3 px-12 rounded-xl'>{label}</label>
            <input
                type='file'
                accept='image/*'
                id={id}
                className='hidden'
                {...register(id)}
            />
            {file instanceof File && <img src={URL.createObjectURL(file)} alt='post image' className='my-4 w-fit mx-auto rounded-lg' />}
            {error && <InputErrorMessage message={error.message} />}
        </div>
    )
}

export default FormSectionWithFileInput