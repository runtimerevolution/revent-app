import { Contest } from './helpers/interfaces'
import Link from 'next/link'

interface ContestCardProps {
  contest: Contest
}

export default function ContestCard({ contest }: ContestCardProps) {
  console.log('contest', contest)
  return (
    <Link href={`/contests/${contest.id}`}>
      <div
        key={contest.id}
        className='bg-white rounded-lg overflow-hidden shadow-m h-full w-full'
        style={{
          backgroundImage: `url(${contest.cover_picture?.picture_path})`,
          backgroundSize: 'cover',
          height: '15em',
        }}
      >
        <img
          src='/images/camera.svg'
          className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
        />

        <h3 className='text-gray-100 font-medium text-lg mt-10'>
          {contest.title}
        </h3>
        {/* <h3 className='text-gray-100 font-medium text-lg mb-2'>
            {contest.upload_phase_end?.slice(0, 10)}
          </h3> */}
        <h3 className='text-gray-100 text-sm mt-24 flex justify-end'>
          {contest?.status == 'voting' && <h3>Vote</h3>}
          {/* {contest.upload_phase_end?.slice(0, 10)} */}
        </h3>
        {/* </div> */}
      </div>
    </Link>
  )
}
