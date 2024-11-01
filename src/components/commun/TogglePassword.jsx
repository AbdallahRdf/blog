import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

function TogglePassword({ inputId }) {

    const [isEyeOpen, setIsEyeOpen] = useState(true);

    const handlePassowrdClick = () => {
        const passwordInput = document.getElementById(inputId);
        passwordInput.type = passwordInput.type === "text" ? "password" : "text";
        setIsEyeOpen(prev => !prev);
    }

    return (
        <button type='button' onClick={handlePassowrdClick} className='absolute top-2 md:top-3 right-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1'>
            {
                isEyeOpen
                    ?
                    <Eye className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
                    :
                    <EyeOff className='transition-colors duration-300 ease-in-out size-5 md:size-6 text-slate-500 dark:text-slate-200' />
            }
        </button>
    )
}

export default TogglePassword