import { Trash } from 'lucide-react'
import React from 'react'
import TextEditor from './TextEditor'

function TextEditorBlock({ blockData, error, handleBlockChange, deleteBlock }) {

    const { id, value } = blockData;

    const handleChange = (data) => handleBlockChange(id, data);

    return (
        <div id={id} className='relative mt-9 mx-3'>
            <button type='button' onClick={deleteBlock} title='Delete Block' className='absolute z-10 top-1 right-4 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 p-2 rounded-full'>
                <Trash />
            </button>
            <TextEditor content={value} handleEditorChange={handleChange} />
            {error && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{error.message}</small>}
        </div>
    )
}

export default TextEditorBlock