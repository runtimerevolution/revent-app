import React from 'react'
import Image from 'next/image'

export default function Collection(props) {
  const { collection } = props
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full' src='/images/contest.jpeg' alt='' />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>{collection.name}</div>
          <p className='text-gray-700 text-base'>{collection.user}</p>
        </div>
      </div>
    </>
  )
}
