import React from 'react'
import PostImage from './PostImage'
import CodeSnippet from './CodeSnippet'
import CodeSnippetOutput from './CodeSnippetOutput'
import postBodyBlocks from '../../enums/postBodyBlocks'
import PostText from './PostText'

function PostBody({ content, postBody }) {

  const postBodyJSX = postBody.map((block, index) => {
    switch (block.type) {
      case postBodyBlocks.EDITOR: return <PostText key={index} content={block.value} />
      case postBodyBlocks.IMAGE: return <PostImage key={index} url={URL.createObjectURL(block.value)} />
      case postBodyBlocks.CODE_OUTPUT: return <CodeSnippetOutput key={index} output={block.value} />
      case postBodyBlocks.CODE_SNIPPET: return <CodeSnippet key={index} language={block.language} code={block.value} />
      default: return null;
    }
  });

  return (
    <>
      <PostText content={content} />
      {postBodyJSX}
    </>
  )
}

export default PostBody