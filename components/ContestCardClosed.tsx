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
      <div className='grid grid-cols-2 gap-4 mt-10 ml-2'>
        <div className='flex items-center justify-start mb-5'>
          <Image
            src='/images/lock_small.svg'
            alt='plus'
            width={20}
            height={20}
            className='rounded-full'
          />
          <h3 className='font-bold text-white text-md mr-10'>Contest Closed</h3>
        </div>
        <div className='flex items-center justify-end'>
          <h3 className='font-bold text-white text-xl mr-2 mb-2'>View</h3>
        </div>
      </div>
    </BaseContestCard>
  )
}
