import { useQuery } from '@apollo/client'
import Image from 'next/image'
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

  return (
    <>
      {!loadingComments && !errorComments && (
        <>
          <div className='flex items-center'>
            <Image
              src='/images/comment.svg'
              alt='comment'
              width={40}
              height={40}
              className='mr-2'
            />
            <p>{commentData?.picture_comments?.length}</p>
          </div>
        </>
      )}
    </>
  )
}
