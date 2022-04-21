import { useQuery } from '@apollo/client'
import { GET_COMMENTS } from '../graphql/queries'

const Comment = ({ data, photoContent }) => {
  return (
    <div>
      <p>{data.text}</p>
      <p>{photoContent}</p>
    </div>
  )
}

const CommentsOnPhoto = ({ photoContent }) => {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: {
      content: photoContent,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.comments.map((commentData) => (
    <Comment key={comment.id} data={commentData} photoContent={photoContent} />
  ))
}

export default CommentsOnPhoto
