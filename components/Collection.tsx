import React from 'react'

export interface User {
  name_first: string
  name_last: string
}
export interface Picture {
  picture_path: string
}
export interface Collection {
  user: User
  pictures: Picture[]
}
export interface CollectionProps {
  collection: Collection
}

export default function Collection({ collection }: CollectionProps) {
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img
          className='w-full'
          src={
            collection.pictures.length > 0
              ? collection.pictures[0].picture_path.toString()
              : '/images/collection.jpeg'
          }
          alt=''
        />

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
