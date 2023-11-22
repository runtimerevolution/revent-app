import Image from 'next/image'
import React from 'react'
import ContestCardClosed from './ContestCardClosed'
import ContestCardOpen from './ContestCardOpen'
import ContestCardVoting from './ContestCardVoting'

export default function ContestList({ filteredContestList }) {
  return (
    <div>
      {filteredContestList?.length > 0 && (
        <>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {filteredContestList?.map((contest) => (
              (contest.status == 'open' && (<ContestCardOpen key={contest.id} contest={contest} />)) ||
              (contest.status == 'closed' && (<ContestCardClosed key={contest.id} contest={contest} />)) ||
              (contest.status == 'voting' && (<ContestCardVoting key={contest.id} contest={contest} />))
            ))}
          </div>
        </>
      )}
    </div>
  )
}
