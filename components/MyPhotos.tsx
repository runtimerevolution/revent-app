import React from 'react'
import { MyPhoto } from './helpers/interfaces'

export interface MyPhotoProps {
  myphoto: MyPhoto
}

export default function MyPhotos({ myphoto }: MyPhotoProps) {
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full' src='/images/contest.jpeg' alt='' />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>{myphoto.description}</div>
          <p className='text-gray-700 text-base'>{myphoto.user}</p>
        </div>
      </div>
    </>
  )
}
