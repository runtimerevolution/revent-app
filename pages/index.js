import { getContestList } from '/services/reventService.js'
import PropTypes from 'prop-types'
export default function Home() {
  return (
    <div className='p-8 bg-gray-300'>
      <div className='px-8'>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          Available links:
          <a href='contests'>Contests</a>
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let contestList = null

  try {
    contestList = await getContestList()
  } catch (err) {
    console.log('Error', err)
  }

  return {
    props: {
      contestList,
    },
  }
}

Home.propTypes = { contestList: PropTypes.array }
