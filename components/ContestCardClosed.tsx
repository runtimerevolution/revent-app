import Image from 'next/image'
import React from 'react'
import BaseContestCard from './BaseContestCard'
import { ContestCardProps } from './helpers/interfaces'

export default function ContestCardClosed({ contest }: ContestCardProps) {
  return (
    <BaseContestCard contest={contest}>
      <img
        src='/images/lock.svg'
        className='bg-gray-200 rounded-full ml-2 mt-2 brightness-50'
      />
      <div className='grid grid-cols-2 gap-4 mt-16 px-2 w-full'>
        <div className='flex items-center justify-start mb-5'>
          <Image
            src='/images/lock_small.svg'
            alt='plus'
            width={20}
            height={20}
            className='rounded-full'
          />
          <h3 className='font-inter text-white text-sm mr-10 pl-1.5'>Contest Closed</h3>
        </div>
        <div className='flex items-center justify-end'>
          <h3 className='font-inter text-white text-base mr-2 mb-2'>View</h3>
        </div>
      </div>
    </BaseContestCard>
  )
}
