import { useQuery } from "@apollo/client"
import { GET_CURRENT_CONTEST } from '../graphql/queries'

const CurrentContest = ({ data }) => {
  // Here, i already have access to all the data (description...) associated with the contest
  return (
    <div>
      <p>
        {data}
      </p>
    </div>
  )
}

const Contest = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_CONTEST)
  if (loading) return "loading"
  if (error) return "error"
  console.log('Contest', data)

  // Substituir queryName depois quando souber
  return data.queryName.map((contestData) => <CurrentContest key={data.contestData.id} {...contestData} />)
}

export default Contest
