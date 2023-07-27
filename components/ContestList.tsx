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

  console.log('votingContests.length', !votingContests?.length)
  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        {openContests?.length > 0 && (
          <>
            <p>Open Contests</p>
            {openContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </>
        )}
      </div>

      <hr />

      <div className='grid grid-cols-4 gap-4'>
        {votingContests?.length > 0 && (
          <>
            <p>Voting Contests</p>
            {votingContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </>
        )}
      </div>

      <hr />

      <div className='grid grid-cols-4 gap-4'>
        {closedContests?.length > 0 && (
          <>
            <p>Closed Contests</p>
            {closedContests?.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
