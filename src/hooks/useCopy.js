import { useState } from "react";

const useCopy = (delay = 2500) => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = (textToCopy) => {
        setIsCopied(true);
        navigator.clipboard.writeText(textToCopy)
        setTimeout(() => {
            setIsCopied(false);
        }, delay);
    }

    return { isCopied, copy }
}

export default useCopy;