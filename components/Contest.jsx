import { useQuery } from '@apollo/client'
import { GET_ALL_CURRENT_CONTESTS } from '../graphql/queries'

const CurrentContest = ({ data }) => {
  // Here, i already have access to all the data (description...) associated with the contest
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Description: {data.description}</p>
      <p>Start: {data.dateStart}</p>
      <p>End: {data.dateEnd}</p>
      <br />
    </div>
  )
}

const Contest = () => {
  const { loading, error, data } = useQuery(GET_ALL_CURRENT_CONTESTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.getCurrentContests.map((contestData) => (
    <CurrentContest key={contestData.id} data={contestData} />
  ))
}

export default Contest
