import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import ContentfulRichTech from '../components/contentful-rich-text'

const Post = ({
  data: {
    contentfulPosts: {
      featuredImage,
      url,
      seoTitle,
      seoDescription: { seoDescription },
      postTitle,
      author,
      createdAt,
      richText,
    },
  },
}) => {
  return (
    <>
      <Seo
        customTitle={seoTitle}
        customDescription={seoDescription}
        customUrl={url}
        customImage={featuredImage}
      />
      <article className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-blog">
          <div>
            <h1 className="text-4xl sm:text-5xl text-left font-black text-gray-700 leading-tight">
              {postTitle}
            </h1>
          </div>
          <div className="grid gap-2 text-sm text-gray-600 leading-relaxed justify-items-end text-right">
            <p className="grid">
              <span className="text-xs font-bold text-gray-500">Author:</span>
              {author}
            </p>
            <p className="grid">
              <span className="text-xs font-bold text-gray-500">
                Date published:{' '}
              </span>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <section>
            <ContentfulRichTech richText={richText} />
          </section>
        </div>
      </article>
    </>
  )
}

export default Post

export const query = graphql`
  query ($id: String) {
    contentfulPosts(id: { eq: $id }) {
      featuredImage {
        gatsbyImageData
      }
      url
      seoTitle
      seoDescription {
        seoDescription
      }
      postTitle
      author
      createdAt
      richText {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1000)
            __typename
          }
        }
      }
    }
  }
`
