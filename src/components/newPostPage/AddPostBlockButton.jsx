import React from 'react'
import postBodyBlocks from '../../enums/postBodyBlocks'
import { Code, FileText, Image, Terminal } from 'lucide-react';

function AddPostBlockButton({ handleAddBlock, blockType }) {

    // icon and style for blockType === postBodyBlocks.CODE_SNIPPET
    let icon = <Code className='inline' />
    let style = "hover:text-amber-700 dark:hover:text-amber-500 hover:bg-amber-100";

    switch (blockType) {
        case postBodyBlocks.CODE_OUTPUT:
            icon = <Terminal className='inline' />;
            style = "hover:text-cyan-700 dark:hover:text-cyan-500 hover:bg-cyan-100";
            break;

        case postBodyBlocks.IMAGE:
            icon = <Image className='inline' />;
            style = "hover:text-rose-700 dark:hover:text-rose-500 hover:bg-rose-100";
            break;

        case postBodyBlocks.EDITOR:
            icon = <FileText className='inline' />;
            style = "hover:text-lime-700 dark:hover:text-lime-500 hover:bg-lime-100";
            break;
    }

    return (
        <button
            onClick={handleAddBlock}
            data-block-type={blockType}
            type='button'
            title={blockType}
            className={`transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 py-2 sm:py-3 font-semibold text-zinc-900 dark:text-zinc-50 w-full cursor-pointer dark:hover:bg-zinc-800 ${style}`}
        >
            {icon} <span className='hidden sm:block'>{blockType}</span>
        </button>
    )
}

export default AddPostBlockButton