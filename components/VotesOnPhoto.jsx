import { useQuery } from '@apollo/client'
import { GET_VOTES } from '../graphql/queries'

const Votes = ({ data, photoContent }) => {
  return (
    <div>
      <p>{data.value}</p>
      <p>{photoContent}</p>
    </div>
  )
}

const VotesOnPhoto = ({ photoContent }) => {
  const { loading, error, data } = useQuery(GET_VOTES, {
    variables: {
      content: photoContent,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.votes.map((votesData) => (
    <Votes key={votes.id} data={votesData} photoContent={photoContent} />
  ))
}

export default VotesOnPhoto
