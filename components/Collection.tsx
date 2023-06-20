import React from 'react'
import { CollectionProps } from './helpers/interfaces'

export default function Collection({ collection }: CollectionProps) {
  const cover_picture_path =
    collection.pictures.length > 0
      ? collection.pictures[0].picture_path.toString()
      : '/images/collection.jpeg'
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full' src={cover_picture_path} alt='' />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>
            {collection.user.name_first} {''}
            {collection.user.name_last}
          </div>
          {/* <p className='text-gray-700 text-base'>{collection.user}</p> */}
        </div>
      </div>
    </>
  )
}
