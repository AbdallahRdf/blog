import { LoaderCircle } from 'lucide-react';
import React from 'react'

function ActionButton({ label, handleClick, isSubmitting, type = 'button' }) {
    let bgColors = null;

    switch (label) {
        case 'Cancel':
            bgColors = 'bg-gray-500 hover:bg-gray-400'; break;
        case 'Clear Form':
            bgColors = 'bg-amber-500 hover:bg-amber-400'; break;
        case 'Preview':
            bgColors = 'bg-lime-500 hover:bg-lime-400'; break;
        case 'Submit':
            bgColors = `bg-purple-500 hover:bg-purple-400`; break;
    }

    return (
        <button
            disabled={isSubmitting}
            onClick={type !== 'submit' ? handleClick : () => { }}
            type={type}
            className={`transition-colors duration-500 ease-in-out px-6 py-2 ${bgColors} text-zinc-50 rounded-lg text-base sm:text-lg font-semibold w-full ${isSubmitting && 'cursor-wait'}`}
        >
            {
                (type === 'submit' && isSubmitting)
                    ?
                    <LoaderCircle className='animate-spin w-full' />
                    :
                    label
            }
        </button>
    )
}

export default ActionButton