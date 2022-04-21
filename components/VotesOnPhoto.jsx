import { useQuery } from '@apollo/client'
import { GET_VOTES_BY_SUBMISSION_ID } from '../graphql/queries'

const Votes = ({ data, photoID }) => {
  return (
    <div>
      <p>Value do vote: {data.value}</p>
      <p>Submission: {photoID}</p>
    </div>
  )
}

const VotesOnPhoto = ({ photoID }) => {
  const { loading, error, data } = useQuery(GET_VOTES_BY_SUBMISSION_ID, {
    variables: {
      id: photoID,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.getVotesBySubmissionId.map((votesData) => (
    <Votes key={votesData.id} data={votesData} photoID={photoID} />
  ))
}

export default VotesOnPhoto
