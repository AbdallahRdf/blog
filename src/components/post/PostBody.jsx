import React from 'react'
import PostHeader from './PostHeader'
import PostSubHeader from './PostSubHeader'
import PostParagraph from './PostParagraph'
import PostImage from './PostImage'
import CodeSnippet from './CodeSnippet'
import CodeSnippetOutput from './CodeSnippetOutput'
import CustomLink from './CustomLink'

function PostBody() {

  const codeString = `
import React from 'react'

function PostTag({children}) {
  return (
    <a href='/' className='text-fuchsia-400 hover:bg-slate-800 p-1 rounded-lg'>{children}</a>
  )
}

export default PostTag
  `;

  const output = `Hello, world!`

  return (
    <>
      <PostHeader>The partnership between daily.dev and Product Hunt</PostHeader>
      <PostSubHeader>The partnership between daily.dev and Product Hunt</PostSubHeader>
      <PostParagraph>
        This source is from 
        <CustomLink url="google.com">here!</CustomLink> 
        (click the link)
      </PostParagraph>
      <PostParagraph>At daily.dev, we are passionate about serving our developer community with a personalized feed of high-quality knowledge sourced from over hundreds specialized developer content sources. This treasure trove of knowledge enables our community to stay updated and informed every day.</PostParagraph>
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
      <PostImage url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.gAK6P5ldcQNuQuEKYfGCeAHaEK%26pid%3DApi&f=1&ipt=7447804103ab0e492c5a055e00ba763d59145951f9ea997da9c0b14c0be2577b&ipo=images" />
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
      <PostImage url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.fE8-Ik35paue-_f9qwnIcgHaE8%26pid%3DApi&f=1&ipt=092123cef80ea37244f0d3e8479c97a5fb084e7227ef922ccb91c4dbc20897fd&ipo=images" />
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>

      <CodeSnippet language="jsx">
        {codeString}
      </CodeSnippet>

      <PostParagraph>The output should be: </PostParagraph>

      <CodeSnippetOutput>
        {output}
      </CodeSnippetOutput>

      <PostHeader>The partnership between daily.dev and Product Hunt</PostHeader>
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
      <PostSubHeader>The partnership between daily.dev and Product Hunt</PostSubHeader>
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
      <PostParagraph>Our content sources also enjoy value from our platform: High-intent developer traffic that's eager to explore what they have to present. As part of our ongoing series, we're shedding light on some of our most popular, engaging, and impactful content sources, revealing how our collaboration has amplified their reach. </PostParagraph>
    </>
  )
}

export default PostBody