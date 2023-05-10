import React from 'react'
import Image from 'next/image'

export default function Collection(props) {
  const { collection } = props
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img
          className='w-full'
          src='https://www.thoughtco.com/thmb/LIkTVpCr3NAa7qJW7D57BXgRiJA=/3396x2547/smart/filters:no_upscale()/film-photography-592347645-59e4d0609abed500119e7b14.jpg'
          alt=''
        />

        <div className='px-6 py-4 text-center'>
          <div className='font-bold text-xl mb-2'>{collection.name}</div>
          <p className='text-gray-700 text-base'>{collection.user}</p>

          {/* {collection.pictures?.map((picture) => (
            <Image
              src={picture.picture_path}
              alt='Cleek'
              width={40}
              height={40}
            />
          ))} */}
        </div>
      </div>
    </>
  )
}
