import { Contest } from './helpers/interfaces'
import Link from 'next/link'
import Image from 'next/image'

interface ContestCardProps {
  contest: Contest
}

export default function ContestCard({ contest }: ContestCardProps) {
  const endDateString = contest.upload_phase_end?.slice(0, 10)
  const endDate = new Date(endDateString)

  const currentDate = new Date()
  const timeDifference = endDate.getTime() - currentDate.getTime()
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  const pictureCover = contest.cover_picture?.picture_path
    ? contest.cover_picture?.picture_path
    : '/images/placeholder.svg'
  return (
    <Link href={`/contests/${contest.id}`}>
      <div
        key={contest.id}
        className='bg-white rounded-lg overflow-hidden shadow-m h-full w-full'
        style={{
          backgroundImage: `url(${pictureCover})`,
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
          {contest?.status == 'open' && (
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center justify-start'>
                <Image
                  src='/images/clock.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <h3 className='font-bold text-md mr-10'>
                  End is {daysLeft} days
                </h3>
              </div>
              <div className='flex items-center justify-end'>
                <h3 className='font-bold text-xl mr-2 '>Join</h3>
              </div>
            </div>
          )}
          {contest?.status == 'voting' && (
            <h3 className='font-bold mb-2 mr-2'>Vote</h3>
          )}
          {/* {contest.upload_phase_end?.slice(0, 10)} */}
        </h3>
        {/* </div> */}
      </div>
    </Link>
  )
}
