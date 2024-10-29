import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useRef, useState } from "react";
import { Check, CopyIcon } from 'lucide-react';


const CodeSnippet = ({ language, code }) => {

    const preRef = useRef(null);
    const [preHeight, setPreHeight] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = (e) => {
        setIsCopied(true);
        navigator.clipboard.writeText(code)
        setTimeout(() => {
            setIsCopied(false);
        }, 2500);
    }

    useEffect(() => {
        setPreHeight(preRef.current.offsetHeight)
    }, [])

    return (
        <div className='relative' style={{ height: `${preHeight}px` }} >
            <div ref={preRef} className='text-sm sm:text-base border border-zinc-800 rounded-xl overflow-x-auto absolute top-0 left-0 right-0'>
                <div className='text-zinc-300 border-b border-zinc-800 bg-zinc-800 py-2 px-3 flex justify-between'>
                    <span>{language}</span>
                    <button
                        disabled={isCopied}
                        title='Copy'
                        onClick={handleClick}
                    >
                        {
                            isCopied
                                ?
                                <>
                                    <Check className='inline size-4 sm:size-5' />
                                    <span className='ps-1'>Copied!</span>
                                </>
                                :
                                <>
                                    <CopyIcon className='inline size-4 sm:size-5' />
                                    <span className='ps-1'>Copy code</span>
                                </>
                        }
                    </button>
                </div>
                <SyntaxHighlighter language={language} style={irBlack}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeSnippet