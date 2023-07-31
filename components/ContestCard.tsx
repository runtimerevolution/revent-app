import { Contest } from './helpers/interfaces'
import Link from 'next/link'
import Image from 'next/image'

interface ContestCardProps {
  contest: Contest
}

export default function ContestCard({ contest }: ContestCardProps) {
  const endDateString = contest.upload_phase_end?.slice(0, 10)
  const startDateString = contest.upload_phase_start?.slice(0, 10)

  const endDate = new Date(endDateString)
  const startDate = new Date(startDateString)

  const currentDate = new Date()
  const timeDifference = endDate.getTime() - currentDate.getTime()
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  const month = startDate.toLocaleString('en-US', { month: 'long' })

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
        {contest?.status == 'open' && (
          <>
            <img
              src='/images/camera.svg'
              className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
            />
          </>
        )}
        {contest?.status == 'voting' && (
          <>
            <img
              src='/images/heart.svg'
              className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
            />
          </>
        )}
        {contest?.status == 'closed' && (
          <>
            <img
              src='/images/lock.svg'
              className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
            />
          </>
        )}

        <h3 className='text-gray-100 font-medium text-lg mt-10 ml-2'>
          {month}
        </h3>
        <h3 className='text-gray-100 font-medium text-lg ml-2'>
          {contest.title}
        </h3>
        <div className='text-gray-100 text-sm flex justify-end mb-5'>
          {contest?.status == 'open' && (
            <div className='grid grid-cols-2 gap-4 mt-10 ml-2'>
              <div className='flex items-center justify-start mb-5'>
                <Image
                  src='/images/clock.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <h3 className='font-bold text-md mr-10'>
                  End in {daysLeft} days
                </h3>
              </div>
              <div className='flex items-center justify-end'>
                <h3 className='font-bold text-xl mr-2 mb-2 '>Join</h3>
              </div>
            </div>
          )}
          {contest?.status == 'voting' && (
            <div className='grid grid-cols-2 gap-4 mt-10 ml-2'>
              <div className='flex items-center justify-start mb-5'>
                <Image
                  src='/images/clock.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <h3 className='font-bold text-md mr-10'>Voting Phase</h3>
              </div>
              <div className='flex items-center justify-end'>
                <h3 className='font-bold text-xl mr-2 mb-2'>Vote</h3>
              </div>
            </div>
          )}
          {contest?.status == 'closed' && (
            <div className='grid grid-cols-2 gap-4 mt-10 ml-2'>
              <div className='flex items-center justify-start mb-5'>
                <Image
                  src='/images/lock_small.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <h3 className='font-bold text-md mr-10'>Contest Closed</h3>
              </div>
              <div className='flex items-center justify-end'>
                <h3 className='font-bold text-xl mr-2 mb-2'>View</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
