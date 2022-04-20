import { useQuery } from '@apollo/client'
import { GET_CURRENT_CONTEST } from '../graphql/queries'

const CurrentContest = ({ data }) => {
  // Here, i already have access to all the data (description...) associated with the contest
  return (
    <div>
      <p>{data.name}</p>
    </div>
  )
}

const Contest = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_CONTEST)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>
  console.log('Contest', data.contests)

  return data.contests.map((contestData) => (
    <CurrentContest data={contestData} />
  ))
}

export default Contest
