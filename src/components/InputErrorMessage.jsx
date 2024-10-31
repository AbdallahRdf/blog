import React from 'react'

function InputErrorMessage({ message }) {
    return (
        <small className='text-red-500 dark:text-red-400 text-sm sm:text-base mt-1 ms-1'>{message}</small>
    )
}

export default InputErrorMessage