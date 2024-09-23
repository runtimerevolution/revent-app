import Image from 'next/image'
import React from 'react'
import ContestCardClosed from 'components/ContestCardClosed'
import ContestCardOpen from 'components/ContestCardOpen'
import ContestCardVoting from 'components/ContestCardVoting'
import ContestCardDraw from 'components/ContestCardDraw'

export default function ContestList({ contestList }) {
  const openContests = contestList?.filter(
    (contest) => contest.status === 'open' && contest.internal_status === 'open'
  )
  const votingContests = contestList?.filter(
    (contest) =>
      contest.status === 'voting' && contest.internal_status === 'open'
  )
  const closedContests = contestList?.filter(
    (contest) =>
      contest.status === 'closed' && contest.internal_status === 'closed'
  )
  const drawContests = contestList?.filter(
    (contest) => contest.internal_status === 'draw' && contest.voting_draw_end
  )

  return (
    <>
      {drawContests?.length > 0 && (
        <>
          <div className='my-6'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/warning.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full color-gray-500'
              />
              <div className='ml-2 mr-4 text-gray-500 whitespace-nowrap'>
                Tied Contests
              </div>
            </a>
          </div>
          <div className='flex flex-col gap-6 md:w-72'>
            {drawContests?.map((contest) => (
              <ContestCardDraw key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}
      {openContests?.length > 0 && (
        <>
          <div className='my-6'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/opencontests.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <div className='ml-2 mr-4 text-gray-500 whitespace-nowrap'>
                Open Contests
              </div>
            </a>
          </div>
          <div className='flex flex-col gap-6 md:w-72'>
            {openContests?.map((contest) => (
              <ContestCardOpen key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {votingContests?.length > 0 && (
        <>
          <div className='my-6'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/curved_heart.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <div className='ml-2 mr-4 text-gray-500 whitespace-nowrap'>
                Voting Phase
              </div>
            </a>
          </div>
          <div className='flex flex-col gap-6 md:w-72'>
            {votingContests?.map((contest) => (
              <ContestCardVoting key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}

      {closedContests?.length > 0 && (
        <>
          <div className='my-6'>
            <a className='flex items-center contest-divider'>
              <Image
                src='/images/curved_lock.svg'
                alt='plus'
                width={20}
                height={20}
                className='rounded-full'
              />
              <div className='ml-2 mr-4 text-gray-500 whitespace-nowrap'>
                Closed Contests
              </div>
            </a>
          </div>
          <div className='flex flex-col gap-6 md:w-72'>
            {closedContests?.map((contest) => (
              <ContestCardClosed key={contest.id} contest={contest} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
