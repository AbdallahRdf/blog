import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useRef, useState } from "react";
import { Check, CopyIcon } from 'lucide-react';


const CodeSnippet = ({ language, children }) => {

    const preRef = useRef(null);
    const [preHeight, setPreHeight] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = (e) => {
        setIsCopied(true);
        navigator.clipboard.writeText(children)
        setTimeout(() => {
            setIsCopied(false);
        }, 2500);
    }

    useEffect(() => {                   
        setPreHeight(preRef.current.offsetHeight)
    }, [])

    return (
        <div className='relative' style={{ height: `${preHeight}px`}} >
            <div ref={preRef} className='border border-slate-800 rounded-2xl overflow-x-auto absolute top-0 left-0 right-0'>
                <div className='text-slate-300 border-b border-slate-800 bg-slate-800 py-2 px-3 flex justify-between'>
                    <span>{language}</span>
                    <button disabled={isCopied} title='Copy' onClick={handleClick}>
                        {
                            isCopied
                            ?
                            <>
                                <Check className='inline' size={20}/>
                                <span className='ps-1'>Copied!</span>
                            </>
                            :
                            <>
                                <CopyIcon className='inline' size={20}/> 
                                <span className='ps-1'>Copy code</span>
                            </>                            
                        }
                    </button>
                </div>
                <SyntaxHighlighter language={language} style={irBlack}>
                    {children}
                </SyntaxHighlighter> 
            </div>
        </div>
    );
};

export default CodeSnippet