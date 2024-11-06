import React, { useCallback, useContext, useRef, useEffect, useState } from 'react'
import Preview from './Preview'
import NewPostForm from '../components/newPostPage/NewPostForm'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DOMPurify from 'dompurify'
import { yupResolver } from '@hookform/resolvers/yup'
import { createClient } from '@supabase/supabase-js'
import postBodyBlocks from '../enums/postBodyBlocks'
import { v4 as uuidv4 } from 'uuid'
import { UPLOAD_CONFIG } from '../config/upload'
import useCustomAxios from '../hooks/useCustomAxios'
import usePostBlocks from '../hooks/usePostBlocks'
import { AuthContext } from '../context/contexts'

function NewPost() {

    const [showPreviewMode, setShowPreviewMode] = useState(false);

    const headers = useRef([]);
    const formData = useRef(null);
    const postBodyData = useRef(null);

    const navigator = useNavigate();
    const customAxios = useCustomAxios();
    const { setAccessToken } = useContext(AuthContext);

    const [postBody, setPostBody, addBlock, deleteBlock, updateBlock, updateLanguageForCodeSnippetBlock] = usePostBlocks();

    // create a yup validation schema dynamically
    const schema = useCallback(() => {
        const allowedFileTypesRegex = new RegExp(/^image\/\w+/);

        const schema = {
            title: yup
                .string()
                .trim()
                .required('Post title is required'),
            description: yup
                .string()
                .trim()
                .required('Post description is required'),
            cover: yup
                .mixed()
                .required('Post cover is required')
                .test('fileType', 'Only supported file types are: png, jpeg, jpg', (value) => {
                    return (value.length > 0) && allowedFileTypesRegex.test(value[0].type);
                })
                .test('fileSize', `File is too large, limit is 2MB`, (value) => {
                    return (value.length > 0) && value[0].size <= UPLOAD_CONFIG.POST_COVER.SIZE_LIMIT;
                }),
            tags: yup
                .string()
                .trim()
                .required('Post tags are required'),
            content: yup
                .string()
                .trim()
                .required('Post content is required')
                .test('is-sanitized', 'Content contains unsafe HTML', (value) => {
                    const cleanContent = DOMPurify.sanitize(value);

                    // If the content is non-empty and valid after sanitization, pass the test
                    return cleanContent.length > 0;
                })
        }

        postBody.reduce((acc, currentBlock) => {

            if (currentBlock.type === postBodyBlocks.EDITOR) {
                acc[currentBlock.id] = yup
                    .string()
                    .trim()
                    .required('This field is required')
                    .test('is-sanitized', 'Content contains unsafe HTML', (value) => {
                        const cleanContent = DOMPurify.sanitize(value);

                        // If the content is non-empty and valid after sanitization, pass the test
                        return cleanContent.length > 0;
                    })
            } else if (currentBlock.type === postBodyBlocks.IMAGE) {

                acc[currentBlock.id] = yup
                    .mixed()
                    .required('Image is required')
                    .test('fileType', 'Only images are allowed', (value) => {
                        return allowedFileTypesRegex.test(value.type);
                    })
                    .test('fileSize', `File is too large, limit is 1MB`, (value) => {
                        return value.size <= UPLOAD_CONFIG.POST_IMAGE.SIZE_LIMIT;
                    })
            } else {
                acc[currentBlock.id] = yup
                    .string()
                    .trim()
                    .required('Feild is required');
            }

            return acc;
        }, schema);

        return yup.object().shape(schema);
    }, [postBody]);

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, unregister, trigger, watch } = useForm({
        resolver: yupResolver(schema()),
        defaultValues: JSON.parse(localStorage.getItem('post_content')) ||
        {
            title: '',
            description: '',
            cover: '',
            tags: '',
            content: ''
        }
    });

    const formValues = watch();

    useEffect(() => {
        localStorage.setItem('post_content', JSON.stringify({ ...formValues, cover: '' }));
    }, [formValues]);

    // This function takes and html in string format, and uses DOMParser API to add an id to the h2 and h3 tags, and setting the headers state, then returns the update html in string format.
    const parseHeaders = (htmlContent) => {
        const parser = new DOMParser();

        const doc = parser.parseFromString(htmlContent, 'text/html');

        doc.querySelectorAll('h2, h3').forEach((header) => {
            const id = uuidv4();
            header.id = id;

            headers.current = [...headers.current, {
                id, // id of the element they refernce to.
                type: header.tagName,
                value: header.textContent
            }]
        });

        return doc.firstChild.innerHTML;
    }

    // it handles getting all the h2 and h3 headers from the form data, and passing them to the parseHeaders.
    const handleHeaders = () => {
        if (headers.current.length > 0) {
            headers.current = [];
        }

        const updatedContent = parseHeaders(formValues.content);
        formData.current = formValues;
        formData.current.content = updatedContent;

        postBodyData.current = postBody.map(block => {
            if (block.type === postBodyBlocks.EDITOR) {
                const updatedBlock = parseHeaders(block.value);
                formData.current[block.id] = updatedBlock;
                block.value = updatedBlock;
            }
            return block;
        });
    }

    const navigateToErrorPage = () => {
        navigator('/internal-server-error', {
            state: {
                statusCode: 500,
                message: 'Server Error'
            }
        });
    }

    const uploadImages = async () => {
        const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

        // updload the post cover.
        const { data: uploadedFileData, error: coverError } = await supabase
            .storage
            .from('blog-images')
            .upload(`${UPLOAD_CONFIG.POST_COVER.PATH}/${uuidv4()}-${formValues.cover[0].name}`, formValues.cover[0]);

        if (coverError) {
            navigateToErrorPage();
            return;
        }

        //uploads all the image in the post
        const body = await Promise.all(postBodyData.current.map(async (block) => {
            delete block.id;
            if (block.type === postBodyBlocks.IMAGE) {
                const { data: uploadedFileData, error } = await supabase
                    .storage
                    .from('blog-images')
                    .upload(`${UPLOAD_CONFIG.POST_IMAGE.PATH}/${uuidv4()}-${block.value.name}`, block.value);

                if (error) {
                    navigateToErrorPage();
                    return;
                }
                block.value = uploadedFileData.path;
            }
            return block;
        }));

        return [uploadedFileData, body];
    }

    const handleFormSubmit = async (data) => {
        
        handleHeaders();
        const [uploadedFileData, body] = await uploadImages();

        const payload = {
            title: data.title,
            description: data.description,
            headers: headers.current,
            cover: uploadedFileData.path,
            content: [
                {
                    type: postBodyBlocks.EDITOR,
                    value: formData.current.content
                },
                ...body
            ],
            tags: data.tags
                .split(' ')
                .filter(tag => tag.trim() !== '')
        };

        console.log('payload');
        console.log(payload);

        try {
            const response = await customAxios.post('/posts', payload);
            if (response.accessToken) {
                setAccessToken(response.accessToken);
            }
            // clearForm();
            navigator('/');
        } catch (error) {
            navigateToErrorPage();
        }
    }

    // handles change for the first text editor;
    const handleEditorChange = (data) => setValue('content', data);

    const handlePreview = async () => {
        const isFormValid = await trigger();
        if (isFormValid) {
            handleHeaders();
            setShowPreviewMode(true);
        }
    }

    const clearForm = () => {
        if (headers.current.length > 0) {
            headers.current = [];
        }
        if (postBody.length > 0) {
            postBody.forEach(block => unregister(block.id));
            setPostBody([]);
        }
        setValue('title', '');
        setValue('description', '');
        setValue('tags', '');
        setValue('cover', '');
        setValue('content', '');
        localStorage.removeItem('post_content');
        localStorage.removeItem('post_body');
    }

    const addNewBlock = (e) => {
        const newBlock = addBlock(e);
        setValue(newBlock.id, '');
    }

    const handleDeleteBlock = (e) => {
        const blockIdToBeDeleted = deleteBlock(e);
        unregister(blockIdToBeDeleted);
    }

    const handleBlockChange = (id, value) => {
        updateBlock(id, value);
        setValue(String(id), value);
    }

    return (
        showPreviewMode
            ?
            <Preview setShowPreviewMode={setShowPreviewMode} formValues={formData.current} postBody={postBodyData.current} headers={headers.current} />
            :
            <NewPostForm
                postBody={postBody}
                register={register}
                handleSubmit={handleSubmit}
                handleFormSubmit={handleFormSubmit}
                errors={errors}
                formValues={formValues}
                handleEditorChange={handleEditorChange}
                addNewBlock={addNewBlock}
                handleDeleteBlock={handleDeleteBlock}
                handleBlockChange={handleBlockChange}
                updateLanguageForCodeSnippetBlock={updateLanguageForCodeSnippetBlock}
                clearForm={clearForm}
                handlePreview={handlePreview}
                isSubmitting={isSubmitting}
            />
    )
}

export default NewPost