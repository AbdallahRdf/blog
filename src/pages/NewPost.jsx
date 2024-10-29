import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TextEditor from '../components/createPostPage/TextEditor'
import DOMPurify from 'dompurify'
import Preview from './Preview'
import { Code, FileText, Image, Terminal } from 'lucide-react'
import TextArea from '../components/createPostPage/TextArea'
import ImageInput from '../components/createPostPage/ImageInput'
import TextEditorBlock from '../components/createPostPage/TextEditorBlock'
import postBodyBlocks from '../enums/postBodyBlocks'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']; // Allowed formats
const POST_COVER_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
const IMAGE_SIZE_LIMIT = 1 * 1024 * 1024; // 1MB

// create a yup validation schema dynamically
const createSchema = (postBody) => {
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
                return (value.length > 0) && SUPPORTED_FORMATS.includes(value[0].type);
            })
            .test('fileSize', `File is too large, limit is 2MB`, (value) => {
                return (value.length > 0) && value[0].size <= POST_COVER_SIZE_LIMIT;
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
                .test('fileType', 'Only supported file types are: png, jpeg, jpg', (value) => {
                    return SUPPORTED_FORMATS.includes(value.type);
                })
                .test('fileSize', `File is too large, limit is 1MB`, (value) => {
                    return value.size <= IMAGE_SIZE_LIMIT;
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
}

function NewPost() {
    const navigate = useNavigate();

    const [showPreviewMode, setShowPreviewMode] = useState(false);

    // holds the added body blocks like images, code sinppets...
    const [postBody, setPostBody] = useState(JSON.parse(localStorage.getItem('post_body')) || []);

    // will hold the h2 and h3 headers, each hader with {id, type: H2 or H3, content}
    const [headers, setHeaders] = useState([]);

    const { register, handleSubmit, formState: { errors, isLoading }, setValue, unregister, trigger, watch } = useForm({
        resolver: yupResolver(createSchema(postBody)),
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
    // console.log("formValues");
    // console.log(formValues);

    useEffect(() => {
        localStorage.setItem('post_content', JSON.stringify({ ...formValues, cover: '' }));
    }, [formValues]);

    useEffect(() => {
        localStorage.setItem('post_body', JSON.stringify(postBody));
    }, [postBody]);

    const handleCancel = () => navigate('/');

    // This function takes and html in string format, and uses DOMParser API to add an id to the h2 and h3 tags, and setting the headers state, then returns the update html in string format.
    const parseHeaders = (htmlContent) => {
        const parser = new DOMParser();

        const doc = parser.parseFromString(htmlContent, "text/html");

        doc.querySelectorAll("h2, h3").forEach((header, index) => {
            const id = uuidv4();
            header.id = id;

            setHeaders(prev => ([...prev, {
                id,
                type: header.tagName,
                content: header.textContent
            }]));
        });

        return doc.firstChild.innerHTML;
    }

    // it handles getting all the h2 and h3 headers from the form data, and passing them to the parseHeaders.
    const handleHeaders = () => {
        if (headers.length > 0) {
            setHeaders([]);
        }

        const updatedContent = parseHeaders(formValues.content);
        setValue("content", updatedContent);

        const updatePostBody = postBody.map(block => {
            if (block.type === postBodyBlocks.EDITOR) {
                const updatedBlock = parseHeaders(block.value);
                setValue(block.id, updatedBlock);
                block.value = updatedBlock;
                return block;
            }
            return block;
        });
        setPostBody(updatePostBody);
    }

    const handleFormSubmit = (data) => {
        console.log(data);
        // todo:
        // localStorage.removeItem('post_content');
        // localStorage.removeItem('post_body');
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
        if (headers.length > 0) {
            setHeaders([]);
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

    const addBlock = (e) => {
        const newBlock = {
            type: e.currentTarget.dataset.blockType,
            id: uuidv4(),
            value: ""
        };

        if (newBlock.type === postBodyBlocks.CODE_SNIPPET) {
            newBlock.language = "bash";
        }

        setPostBody(prev => ([...prev, newBlock]));
        setValue(newBlock.id, "");
    }

    const deleteBlock = (e) => {
        const button = e.currentTarget;
        const blockToBeDeleteID = button.parentElement.id ? button.parentElement.id : button.parentElement.parentElement.id;

        const blocks = postBody.filter((block) => block.id !== blockToBeDeleteID);

        unregister(blockToBeDeleteID);
        setPostBody(blocks);
    }

    const handleBlockChange = (id, value) => {
        setValue(String(id), value);
        const newPostBody = postBody.map(block => {
            if (block.id === id) {
                block.value = value;
            }
            return block;
        });
        setPostBody(newPostBody);
    }

    const handleLanguageChange = (id, language) => {
        const newPostBody = postBody.map(block => {
            if (block.id === id) {
                block.language = language;
            }
            return block;
        });
        setPostBody(newPostBody);
    }

    const bodyBlocks = postBody.map((block, index) => {

        const communProps = {
            blockData: block,
            error: errors[block.id],
            deleteBlock,
            handleBlockChange
        }
        switch (block.type) {
            case postBodyBlocks.CODE_SNIPPET:
            case postBodyBlocks.CODE_OUTPUT:
                return (
                    <TextArea
                        key={index}
                        {...communProps}
                        handleLanguageChange={handleLanguageChange}
                    />
                )
            case postBodyBlocks.IMAGE:
                return <ImageInput key={index} {...communProps} />
            case postBodyBlocks.EDITOR:
                return <TextEditorBlock key={index} {...communProps} />
        }
    });

    // console.log("postBody");
    // console.log(postBody);

    // console.log("headers");
    // console.log(headers);

    return (
        showPreviewMode
            ?
            <Preview setShowPreviewMode={setShowPreviewMode} formValues={formValues} postBody={postBody} headers={headers} />
            :
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit(handleFormSubmit)}
                className='w-full xl:w-[1280px] mx-auto mt-20 mb-6 rounded-xl py-6'
            >
                <h1 className='text-2xl sm:text-4xl font-semibold text-center'>Create new Post</h1>
                <div className='flex flex-col my-6 px-3'>
                    <label htmlFor='title' className='text-base sm:text-lg font-semibold text-slate-200 inline-block mb-2 ps-1'>Post Title</label>
                    <input
                        type='text'
                        id='title'
                        placeholder='post title...'
                        className={`w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg rounded-xl ring-1 ring-zinc-600 hover:ring-zinc-300 focus:outline-none focus:ring-2 ${errors?.title ? 'focus:ring-red-600' : 'focus:ring-zinc-300'}`}
                        {...register('title')}
                    />
                    {errors?.title && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{errors.title.message}</small>}
                </div>

                <div className='flex flex-col my-6 px-3'>
                    <label htmlFor='description' className='text-base sm:text-lg font-semibold text-slate-200 inline-block mb-2 ps-1'>Post Description</label>
                    <textarea
                        id='description'
                        placeholder='post description'
                        className={`w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg rounded-xl ring-1 ring-zinc-600 hover:ring-zinc-300 focus:outline-none focus:ring-2 ${errors?.description ? 'focus:ring-red-600' : 'focus:ring-zinc-300'}`}
                        {...register('description')}
                    ></textarea>
                    {errors?.description && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{errors.description.message}</small>}
                </div>

                <div className='flex flex-col mb-6 mt-10 px-3'>
                    <label htmlFor='cover' className='text-base sm:text-lg text-center cursor-pointer text-slate-200 w-full bg-transparent ring-1 ring-zinc-600 hover:ring-zinc-300 hover:text-slate-50 py-2 sm:py-3 px-12 rounded-xl'>Import Post Cover</label>
                    <input
                        type='file'
                        accept='image/jpeg, image/jpg, image/png'
                        id='cover'
                        className='hidden'
                        {...register('cover')}
                    />
                    {formValues.cover !== '' && <img src={URL.createObjectURL(formValues.cover[0])} alt='post cover' className='my-4 w-fit mx-auto rounded-lg' />}
                    {errors?.cover && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{errors.cover.message}</small>}
                </div>

                <div className='flex flex-col my-6 px-3'>
                    <label htmlFor='tags' className='text-base sm:text-lg font-semibold text-slate-200 inline-block mb-2 ps-1'>Tags (separated by space)</label>
                    <input
                        type='text'
                        placeholder='example: coding javascript backend ...'
                        id='tags'
                        className={`w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg rounded-xl ring-1 ring-zinc-600 hover:ring-zinc-300 focus:outline-none focus:ring-2 ${errors?.tags ? 'focus:ring-red-600' : 'focus:ring-zinc-300'}`}
                        {...register('tags')}
                    />
                    {errors?.tags && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{errors.tags.message}</small>}
                </div>

                <h3 className='text-xl sm:text-3xl font-semibold text-slate-200 mb-2 px-3 text-center'>Blog Post Body</h3>
                <div className='px-3 my-6 '>
                    <TextEditor content={formValues.content} handleEditorChange={handleEditorChange} />
                    {errors?.content && <small className='text-red-400 text-sm sm:text-base mt-1 ms-1'>{errors.content.message}</small>}
                </div>

                {bodyBlocks}

                <div className='mx-3 my-6 flex border border-zinc-600 rounded-lg'>
                    <button
                        onClick={addBlock}
                        data-block-type={postBodyBlocks.CODE_SNIPPET}
                        type='button'
                        title='Code Snippet'
                        className='flex items-center justify-center gap-2 py-2 sm:py-3 font-semibold hover:text-amber-500 w-full cursor-pointer hover:bg-zinc-800'
                    >
                        <Code className='inline' /> <span className='hidden sm:block'>Code snippet</span>
                    </button>
                    <button
                        onClick={addBlock}
                        data-block-type={postBodyBlocks.CODE_OUTPUT}
                        type='button'
                        title='Code output'
                        className='flex items-center justify-center gap-2 py-2 sm:py-3 font-semibold hover:text-cyan-500 w-full cursor-pointer hover:bg-zinc-800'
                    >
                        <Terminal className='inline' /> <span className='hidden sm:block'>Code output</span>
                    </button>
                    <button
                        onClick={addBlock}
                        data-block-type={postBodyBlocks.IMAGE}
                        type='button'
                        title='Image'
                        className='flex items-center justify-center gap-2 py-2 sm:py-3 font-semibold hover:text-rose-500 w-full cursor-pointer hover:bg-zinc-800'
                    >
                        <Image className='inline' /> <span className='hidden sm:block'>Image</span>
                    </button>
                    <button
                        onClick={addBlock}
                        data-block-type={postBodyBlocks.EDITOR}
                        type='button'
                        title='Editor'
                        className='flex items-center justify-center gap-2 py-2 sm:py-3 font-semibold hover:text-lime-500 w-full cursor-pointer hover:bg-zinc-800'
                    >
                        <FileText className='inline' /> <span className='hidden sm:block'>Editor</span>
                    </button>
                </div>

                <div className='flex justify-stretch flex-col-reverse sm:flex-row gap-2 mx-3 mt-6 sm:mt-10'>
                    <button onClick={handleCancel} type='button' className='px-6 py-2 bg-gray-500 hover:bg-gray-400 rounded-lg text-base sm:text-lg font-semibold transition-colors w-full'>Cancel</button>
                    <button onClick={clearForm} type='button' className='px-6 py-2 bg-amber-500 hover:bg-amber-400 rounded-lg text-base sm:text-lg font-semibold transition-colors w-full'>Clear Form</button>
                    <button onClick={handlePreview} type='button' className='px-6 py-2 bg-lime-500 hover:bg-lime-400 rounded-lg text-base sm:text-lg font-semibold transition-colors w-full'>Preview</button>
                    <input type='submit' value='Save' disabled={isLoading} className='px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-base sm:text-lg font-semibold transition-colors w-full cursor-pointer' />
                </div>
            </motion.form>
    )
}

export default NewPost