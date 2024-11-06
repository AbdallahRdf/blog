import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import postBodyBlocks from "../enums/postBodyBlocks";

const usePostBlocks = () => {
    // holds the added body blocks like images, code sinppets...
    const [postBody, setPostBody] = useState(JSON.parse(localStorage.getItem('post_body')) || []);

    useEffect(() => localStorage.setItem('post_body', JSON.stringify(postBody)), [postBody]);

    // add a new block to the postBody state
    const addBlock = useCallback((e) => {
        const newBlock = {
            id: uuidv4(),
            type: e.currentTarget.dataset.blockType,
            value: '',
            ...(e.currentTarget.dataset.blockType === postBodyBlocks.CODE_SNIPPET ? { language: 'bash' } : {})
        };

        setPostBody(prev => ([...prev, newBlock]));
        return newBlock;
    }, []);

    // delete a specific block from the postBody state
    const deleteBlock = useCallback((e) => {
        const button = e.currentTarget;
        const blockIdToBeDeleted = button.parentElement.id ? button.parentElement.id : button.parentElement.parentElement.id;

        setPostBody(prev => prev.filter((block) => block.id !== blockIdToBeDeleted));
        return blockIdToBeDeleted
    }, [])

    // handle value change of a specific block in the postBody state
    const updateBlock = useCallback((id, value) => {
        setPostBody(prev => prev.map(block => {
            if (block.id === id) {
                block.value = value;
            }
            return block;
        }));
    }, []);

    // handle language change of a specific code snippet block in the postBody state
    const updateLanguageForCodeSnippetBlock = useCallback((id, language) => {
        setPostBody(prev => prev.map(block => {
            if (block.id === id) {
                block.language = language;
            }
            return block;
        }));
    }, []);

    return [postBody, setPostBody, addBlock, deleteBlock, updateBlock, updateLanguageForCodeSnippetBlock];
}

export default usePostBlocks;