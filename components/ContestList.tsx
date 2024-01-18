import Image from 'next/image'
import React from 'react'
import ContestCardClosed from 'components/ContestCardClosed'
import ContestCardOpen from 'components/ContestCardOpen'
import ContestCardVoting from 'components/ContestCardVoting'
import ContestCardDraw from 'components/ContestCardDraw'

export default function ContestList({ filteredContestList }) {
  const openContests = filteredContestList?.filter(
    (contest) => (contest.status === 'open' && contest.internal_status === 'open')
  )
  const votingContests = filteredContestList?.filter(
    (contest) => (contest.status === 'voting' && contest.internal_status === 'open')
  )
  const closedContests = filteredContestList?.filter(
    (contest) => (contest.status === 'closed' && contest.internal_status === 'closed')
  )
  const drawContests = filteredContestList?.filter(
    (contest) => (contest.internal_status === 'draw' && contest.voting_draw_end)
  )

  return (
    <div>
      {drawContests?.length > 0 && (
        <>
          <div className='mt-2'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/warning.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full color-gray-500'
              />
              <a className='ml-2 w-72 text-gray-500'>Drawn Contests</a>
            </a>
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {drawContests?.map((contest) => (
              <ContestCardDraw key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}
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
                src='/images/curved_heart.svg'
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
                src='/images/curved_lock.svg'
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
