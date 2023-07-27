import Image from 'next/image'
import React from 'react'
import ContestCard from './ContestCard'

export default function ContestList({ filteredContestList }) {
  const openContests = filteredContestList?.filter(
    (contest) => contest.status === 'open'
  )
  const votingContests = filteredContestList?.filter(
    (contest) => contest.status === 'voting'
  )
  const closedContests = filteredContestList?.filter(
    (contest) => contest.status === 'closed'
  )

  return (
    <div>
      {openContests?.length > 0 && (
        <>
          <div className='mt-2 w-full'>
            <div className='flex items-center justify-center'>
              <a className='flex items-center'>
                <Image
                  src='/images/opencontests.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <span className='ml-2'>Open Contests</span>
              </a>
            </div>
            <hr />
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {openContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {votingContests?.length > 0 && (
        <>
          <div className='mt-2 w-full'>
            <div className='flex items-center justify-center'>
              <a className='flex items-center'>
                <Image
                  src='/images/heart.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <span className='ml-2'>Voting Contests</span>
              </a>
            </div>
            <hr />
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {votingContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {closedContests?.length > 0 && (
        <>
          <div className='mt-2 w-full'>
            <div className='flex items-center justify-center'>
              <a className='flex items-center'>
                <Image
                  src='/images/lock.svg'
                  alt='plus'
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <span className='ml-2'>Closed Contests</span>
              </a>
            </div>
            <hr />
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {closedContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
