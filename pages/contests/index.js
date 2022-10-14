import { getContestList } from '/services/reventService.js'
import PropTypes from 'prop-types'

function RenderContest(props) {
  const { contest } = props
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img
          className='w-full'
          src='https://www.thoughtco.com/thmb/LIkTVpCr3NAa7qJW7D57BXgRiJA=/3396x2547/smart/filters:no_upscale()/film-photography-592347645-59e4d0609abed500119e7b14.jpg'
          alt=''
        />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>{contest.name}</div>
          <p className='text-gray-700 text-base'>{contest.description}</p>
          <p className='text-gray-700 text-base'>
            <a>End date: </a>
            {contest.date_end.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  )
}

export default function Home(props) {
  const { contestList } = props
  return (
    <div className='p-8 bg-gray-300'>
      <div className='px-8'>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          <div className='grid grid-cols-4 gap-4'>
            {contestList?.map((contest) => (
              <RenderContest contest={contest} key={contest.id} />
            ))}
          </div>
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
RenderContest.propTypes = { contest: PropTypes.object }
