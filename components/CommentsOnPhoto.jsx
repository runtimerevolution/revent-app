import { useQuery } from '@apollo/client'
import { GET_COMMENTS_BY_SUBMISSION_ID } from '../graphql/queries'

const Comment = ({ data, photoID }) => {
  return (
    <div>
      <p>Text do comment: {data.text}</p>
      <p>Submission: {photoID}</p>
    </div>
  )
}

const CommentsOnPhoto = ({ photoID }) => {
  const { loading, error, data } = useQuery(GET_COMMENTS_BY_SUBMISSION_ID, {
    variables: {
      id: photoID,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.getCommentsBySubmissionId.map((commentData) => (
    <Comment key={commentData.id} data={commentData} photoID={photoID} />
  ))
}

export default CommentsOnPhoto
