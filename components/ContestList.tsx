import Image from 'next/image'
import React from 'react'
import ContestCardClosed from './ContestCardClosed'
import ContestCardOpen from './ContestCardOpen'
import ContestCardVoting from './ContestCardVoting'

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
  const drawContests = filteredContestList?.filter(
    (contest) => contest.status === 'open'
  )
  console.log(openContests)
  return (
    <div>
      {openContests?.length > 0 && (
        <>
          <div className='mt-2'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/opencontests.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <a className='ml-2 w-72 text-gray-500'>Open Contests</a>
            </a>
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {openContests?.map((contest) => (
              <ContestCardOpen key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {votingContests?.length > 0 && (
        <>
          <div className='mt-2'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/heart.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <a className='ml-1 w-72 text-gray-500'>Voting Phase</a>
            </a>
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {votingContests?.map((contest) => (
              <ContestCardVoting key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {closedContests?.length > 0 && (
        <>
          <div className='mt-2'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/lock.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <a className='ml-2 w-72 text-gray-500'>Closed Contests</a>
            </a>
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {closedContests?.map((contest) => (
              <ContestCardClosed key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
