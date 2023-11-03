import Link from 'next/link'
import React from 'react'
import { CollectionProps } from './helpers/interfaces'

export default function Collection({ collection }: CollectionProps) {
  const cover_file =
    collection.pictures.length > 0
      ? collection.pictures[0].file.toString()
      : '/images/collection.jpeg'

  return (
    <>
      <Link href={`/collections/${collection.id}`}>
        <div className='max-w-sm rounded overflow-hidden shadow-lg max-h-90'>
          <img className='w-full max-h-36' src={cover_file} alt='' />

          <div className='px-6 py-4 text-center'>
            <div className='font-bold text-xl mb-2'>
              {collection.user.name_first} {''}
              {collection.user.name_last}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
