import React from 'react'
import TextEditor from './TextEditor'
import InputErrorMessage from '../commun/InputErrorMessage'

function FormSectionWithTextEditor({ value, handleEditorChange, error }) {
    return (
        <div className='px-3 my-6 '>
            <TextEditor content={value} handleEditorChange={handleEditorChange} />
            {error && <InputErrorMessage message={error.message} />}
        </div>
    )
}

export default FormSectionWithTextEditor