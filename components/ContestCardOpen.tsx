import Image from 'next/image'
import React, { useState } from 'react'
import BaseContestCard from './BaseContestCard'
import { ContestCardProps } from './helpers/interfaces'

export default function ContestCardOpen({ contest }: ContestCardProps) {

  const endDateString = contest.upload_phase_end?.slice(0, 10)
  const endDate = new Date(endDateString)
  const currentDate = new Date()
  const timeDifference = endDate.getTime() - currentDate.getTime()
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  const [showDays, setShowDays] = useState(daysLeft)

  return (
    <BaseContestCard contest={contest}>
      <img
        src='/images/camera.svg'
        className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
      />
      <div className='grid grid-cols-2 gap-4 mt-10 ml-2'>
        <div className='flex items-center justify-start'>
          <Image
            src='/images/clock.svg'
            alt='plus'
            width={20}
            height={20}
            className='rounded-full'
          />
          {showDays ?
            (
              <h3 className='font-bold text-white text-md mr-10 ml-1'>
                End in {daysLeft} days
              </h3>
            ) : (
              <h3 className='font-bold text-white text-md mr-10 ml-1'>
                Open
              </h3>
            )
          }
        </div>
        <div className='flex items-center justify-end'>
          <h3 className='font-bold text-white text-xl mr-2 mb-2 '>Join</h3>
        </div>
      </div>
    </BaseContestCard>
  )
}
