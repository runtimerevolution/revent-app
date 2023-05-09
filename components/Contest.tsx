import React from 'react'
import { getContestList } from '../services/reventService'

export default function Contest(props) {
  const { contest } = props
  console.log('contest', contest)
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img
          className='w-full'
          src='https://www.thoughtco.com/thmb/LIkTVpCr3NAa7qJW7D57BXgRiJA=/3396x2547/smart/filters:no_upscale()/film-photography-592347645-59e4d0609abed500119e7b14.jpg'
          alt=''
        />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>{contest.name}</div>
          <p className='text-gray-700 text-base'>{contest.description}</p>
          <p className='text-gray-700 text-base'>
            <a>End date: </a>
            {contest.date_end.slice(0, 10)}
          </p>
          <p>{contest.status}</p>
        </div>
      </div>
    </>
  )
}
