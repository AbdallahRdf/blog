import React from 'react'
import PostImage from './PostImage'
import PostImagePreviewMode from '../newPostPage/PostImagePreviewMode'
import CodeSnippet from './CodeSnippet'
import CodeSnippetOutput from './CodeSnippetOutput'
import postBodyBlocks from '../../enums/postBodyBlocks'
import PostText from './PostText'

function PostBody({ postContent, previewMode = false }) {

  const postContentJSX = postContent.map((block, index) => {
    switch (block.type) {
      case postBodyBlocks.EDITOR: return <PostText key={index} content={block.value} />
      case postBodyBlocks.IMAGE: return previewMode ? <PostImagePreviewMode key={index} url={URL.createObjectURL(block.value)} /> : <PostImage key={index} path={block.value} />
      case postBodyBlocks.CODE_OUTPUT: return <CodeSnippetOutput key={index} output={block.value} />
      case postBodyBlocks.CODE_SNIPPET: return <CodeSnippet key={index} language={block.language} code={block.value} />
      default: return null;
    }
  });

  return (
    <>
      {postContentJSX}
    </>
  )
}

export default PostBody