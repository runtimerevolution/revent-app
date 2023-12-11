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
      <div className='grid grid-cols-2 gap-4 mt-16 px-2 w-full'>
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
              <h3 className='font-inter text-white text-sm mr-10 pl-1.5'>
                End in {daysLeft} days
              </h3>
            ) : (
              <h3 className='font-inter text-white text-sm mr-10 pl-1.5'>
                Open
              </h3>
            )
          }
        </div>
        <div className='flex items-center justify-end'>
          <h3 className='font-inter text-white text-base mr-2 mb-2 '>Join</h3>
        </div>
      </div>
    </BaseContestCard >
  )
}
