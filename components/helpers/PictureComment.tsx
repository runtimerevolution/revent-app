import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PICTURE_COMMENTS } from '../../lib/graphql'

export default function PictureComment({ image }) {
  const {
    loading: loadingComments,
    error: errorComments,
    data: commentData,
  } = useQuery(GET_PICTURE_COMMENTS, {
    variables: { picture_path: image?.picture_path },
  })

  console.log('commentData?.picture_comments', commentData?.picture_comments)

  return (
    <>
      {!loadingComments && !errorComments && (
        <>
          {commentData?.picture_comments?.map((comment) => (
            <p>{comment.text}</p>
          ))}
        </>
      )}
    </>
  )
}
