import { useQuery } from '@apollo/client'
import { GET_CURRENT_CONTEST } from '../graphql/queries'

const CurrentContest = ({ data }) => {
  // Here, i already have access to all the data (description...) associated with the contest
  return (
    <div>
      <p>{data.id}</p>
      <p>{data.name}</p>
      <p>{data.description}</p>
      <p>{data.dateStart}</p>
      <p>{data.dateEnd}</p>
      <br />
    </div>
  )
}

const Contest = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_CONTEST)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.contests.map((contestData) => (
    <CurrentContest key={contestData.id} data={contestData} />
  ))
}

export default Contest
