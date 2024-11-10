import { TriangleAlert, X } from 'lucide-react'
import React from 'react'

function FormAlert({ boldMessage, normalMessage = "" }) {

    return (
        <div className='transition-all duration-500 ease-in-out relative flex items-center gap-x-2 bg-red-100 dark:bg-red-200 py-4 md:py-5 px-3 my-7 rounded-xl text-sm md:text-lg text-red-700 dark:text-red-950 border-s-4 border-s-red-700 dark:border-none'>
            <TriangleAlert className='inline size-5 md:size-7' /> <span className='font-bold'>{boldMessage}</span>{normalMessage}
        </div>
    )
}

export default FormAlert