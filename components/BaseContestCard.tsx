import Link from 'next/link'
import React from 'react'
import { Contest } from './helpers/interfaces'
interface BaseContestCardProps {
  contest: Contest
  children: any
}

export default function BaseContestCard({
  contest,
  children,
}: BaseContestCardProps) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
  const startDateString = contest.upload_phase_start?.slice(0, 10)

  const startDate = new Date(startDateString)

  const month = startDate.toLocaleString('en-US', { month: 'long' })

  const pictureCover = contest.cover_picture?.file
    ? contest.cover_picture?.file
    : 'images/placeholder.svg'

  return (
    <Link href={`/contests/${contest.id}`}>
      <>
        <div
          key={contest.id}
          className='relative rounded-lg overflow-hidden shadow-m h-full w-full'
          style={{
            backgroundImage: `url(${awsEnv + pictureCover})`,
            backgroundSize: 'cover',
            height: '15em',
          }}
        >
          <div className='absolute inset-0 bg-black opacity-40 rounded-lg'></div>
          <div className='absolute inset-0 flex flex-col justify-start items-start h-fix'>
            {children[0]}
            <h3 className='text-inter text-[#F3F3F4] font-medium text-sm/[18px] mt-10 ml-2 opacity-50'>
              {month}
            </h3>
            <h3 className='text-inter text-white font-medium text-base/[20px] ml-2'>
              {contest.title}
            </h3>
            {children[1]}
            <div className='text-inter text-white text-sm flex justify-end mb-5 h-80'></div>
          </div>
        </div>
      </>
    </Link>
  )
}
