import React from 'react'
import InputErrorMessage from '../commun/InputErrorMessage'

function FormSectionWithTextInput({ label, id, error, register, ...props }) {
    return (
        <div className='flex flex-col my-6 px-3'>
            <label htmlFor={id} className='transition-colors duration-500 ease-in-out text-base sm:text-lg font-semibold text-zinc-900 dark:text-slate-200 inline-block mb-2 ps-1'>{label}</label>
            <input
                type='text'
                id={id}
                placeholder='post title...'
                {...register(id)}
                {...props}
            />
            {error && <InputErrorMessage message={error.message} />}
        </div>
    )
}

export default FormSectionWithTextInput