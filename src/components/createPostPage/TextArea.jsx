import { Trash } from 'lucide-react';
import React, { useId } from 'react'
import postBodyBlocks from '../../enums/postBodyBlocks';
import InputErrorMessage from '../InputErrorMessage';

const languages = [
    "bash",
    "c",
    "cpp",
    "csharp",
    "css",
    "dart",
    "dockerfile",
    "elixir",
    "go",
    "graphql",
    "haskell",
    "html",
    "java",
    "javascript",
    "json",
    "kotlin",
    "latex",
    "lua",
    "markdown",
    "matlab",
    "objectivec",
    "perl",
    "php",
    "powershell",
    "python",
    "r",
    "ruby",
    "rust",
    "scala",
    "scss",
    "shell",
    "solidity",
    "sql",
    "swift",
    "typescript",
    "vbnet",
    "xml",
    "yaml"
];

function TextArea({ blockData, error, deleteBlock, handleBlockChange, handleLanguageChange }) {

    const { id, type, value, language } = blockData;

    const textAreaId = useId();

    const handleChange = (e) => handleBlockChange(id, e.target.value);

    const handleSelectChange = (e) => handleLanguageChange(id, e.target.value);

    return (
        <div
            id={id}
            className='flex flex-col my-6 px-3 relative'
        >
            <div className='transition-colors duration-300 ease-in-out bg-neutral-200 dark:bg-zinc-800 rounded-xl pt-3 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-500 dark:hover:border-zinc-400'>

                {
                    type === postBodyBlocks.CODE_SNIPPET
                    &&
                    <select
                        onChange={handleSelectChange}
                        value={language}
                        className='transition-colors duration-300 ease-in-out text-sm sm:text-lg text-zinc-800 dark:text-zinc-300 cursor-pointer bg-transparent absolute left-4 sm:left-6'
                    >
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                }

                <button
                    type='button'
                    onClick={deleteBlock}
                    title='Delete Block'
                    className='transition-colors duration-300 ease-in-out absolute top-1 right-4 text-zinc-700 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 p-2 rounded-full'
                >
                    <Trash className='size-5 sm:size-6' />
                </button>
                <label htmlFor={textAreaId} className='text-base sm:text-lg text-center w-full font-semibold text-zinc-800 dark:text-slate-200 inline-block mb-2 ps-1'>{type}</label>
                <textarea
                    onChange={handleChange}
                    value={value}
                    id={textAreaId}
                    placeholder='Type...'
                    className='transition-colors duration-300 ease-in-out w-full bg-zinc-50 dark:bg-zinc-950 py-3 px-4 text-base sm:text-lg text-zinc-950 dark:text-zinc-50 rounded-b-xl focus:outline-none'
                ></textarea>
            </div>
            {error && <InputErrorMessage message={error.message} />}
        </div>
    )
}

export default TextArea