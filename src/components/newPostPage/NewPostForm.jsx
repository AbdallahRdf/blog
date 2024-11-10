import { motion } from 'framer-motion'
import FormSectionWithTextInput from './FormSectionWithTextInput'
import AddPostBlockButton from './AddPostBlockButton'
import ActionButton from './ActionButton'
import { useNavigate } from 'react-router-dom'
import postBodyBlocks from '../../enums/postBodyBlocks'
import TextArea from './TextArea'
import ImageInput from './ImageInput'
import TextEditorBlock from './TextEditorBlock'
import FormSectionWithTextarea from './FormSectionWithTextarea'
import FormSectionWithTextEditor from './FormSectionWithTextEditor'
import FormSectionWithFileInput from './FormSectionWithFileInput'

function NewPostForm({
    postBody,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
    formValues,
    handleEditorChange,
    addNewBlock,
    handleDeleteBlock,
    handleBlockChange,
    updateLanguageForCodeSnippetBlock,
    clearForm,
    handlePreview,
    isSubmitting
}) {

    const navigator = useNavigate();

    const bodyBlocks = postBody.map((block, index) => {

        const communProps = {
            blockData: block,
            error: errors[block.id],
            handleDeleteBlock,
            handleBlockChange
        }
        switch (block.type) {
            case postBodyBlocks.CODE_SNIPPET:
            case postBodyBlocks.CODE_OUTPUT:
                return (
                    <TextArea
                        key={index}
                        {...communProps}
                        handleLanguageChange={updateLanguageForCodeSnippetBlock}
                    />
                )
            case postBodyBlocks.IMAGE:
                return <ImageInput key={index} {...communProps} />
            case postBodyBlocks.EDITOR:
                return <TextEditorBlock key={index} {...communProps} />
        }
    });

    const handleCancel = () => navigator('/');

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit(handleFormSubmit)}
            className='w-full xl:w-[1280px] mx-auto rounded-xl py-14'
        >
            <h1 className='text-2xl sm:text-4xl font-semibold text-center text-zinc-950 dark:text-zinc-50 transition-colors duration-500 ease-in-out'>Create new Post</h1>

            <FormSectionWithTextInput
                label='Post Title'
                id='title'
                error={errors?.title}
                register={register}
                placeholder='post title...'
                className={`transition-colors duration-500 ease-in-out w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg text-zinc-950 dark:text-zinc-50 rounded-xl ring-1 ring-zinc-300 dark:ring-zinc-600 hover:ring-zinc-500 dark:hover:ring-zinc-300 focus:outline-none focus:ring-2 ${errors?.title ? 'focus:ring-red-600' : 'focus:ring-zinc-700 dark:focus:ring-zinc-300'}`}
            />

            <FormSectionWithTextarea
                label='Post Description'
                id='description'
                error={errors?.description}
                register={register}
                placeholder='post description'
                className={`transition-colors duration-500 ease-in-out w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg text-zinc-950 dark:text-zinc-50 rounded-xl ring-1 ring-zinc-300 dark:ring-zinc-600 hover:ring-zinc-500 dark:hover:ring-zinc-300 focus:outline-none focus:ring-2 ${errors?.description ? 'focus:ring-red-600' : 'focus:ring-zinc-700 dark:focus:ring-zinc-300'}`}
            />

            <FormSectionWithFileInput
                label='Import Post Cover'
                id='cover'
                error={errors?.cover}
                file={formValues.cover[0]}
                register={register}
            />

            <FormSectionWithTextInput
                label='Tags (separated by space)'
                id='tags'
                error={errors?.tags}
                register={register}
                placeholder='example: coding javascript backend ...'
                className={`transition-colors duration-500 ease-in-out w-full bg-transparent py-2 sm:py-3 px-4 text-base sm:text-lg rounded-xl text-zinc-950 dark:text-zinc-50 ring-1 ring-zinc-300 dark:ring-zinc-600 hover:ring-zinc-500 dark:hover:ring-zinc-300 focus:outline-none focus:ring-2  ${errors?.tags ? 'focus:ring-red-600' : 'focus:ring-zinc-700 dark:focus:ring-zinc-300'}`}
            />

            <h3 className='text-xl sm:text-3xl font-semibold text-zinc-900 dark:text-slate-200 mb-2 px-3 text-center'>Blog Post Body</h3>

            <FormSectionWithTextEditor
                value={formValues.content}
                handleEditorChange={handleEditorChange}
                error={errors?.content}
            />

            {bodyBlocks}

            <div className='mx-3 my-6 flex border border-zinc-600 rounded-lg'>
                <AddPostBlockButton handleAddBlock={addNewBlock} blockType={postBodyBlocks.CODE_SNIPPET} />
                <AddPostBlockButton handleAddBlock={addNewBlock} blockType={postBodyBlocks.CODE_OUTPUT} />
                <AddPostBlockButton handleAddBlock={addNewBlock} blockType={postBodyBlocks.IMAGE} />
                <AddPostBlockButton handleAddBlock={addNewBlock} blockType={postBodyBlocks.EDITOR} />
            </div>

            <div className='flex justify-stretch flex-col-reverse sm:flex-row gap-2 mx-3 mt-6 sm:mt-10'>
                <ActionButton label='Cancel' handleClick={handleCancel} />
                <ActionButton label='Clear Form' handleClick={clearForm} />
                <ActionButton label='Preview' handleClick={handlePreview} />
                <ActionButton label='Submit' type='submit' isSubmitting={isSubmitting} />
            </div>
        </motion.form>
    )
}

export default NewPostForm