import Image from 'next/image'
import React from 'react'
import { User } from './helpers/interfaces'
import PictureComment from './helpers/PictureComment'

interface Image {
  likes?: User[]
  picture_path: string
  user: User
}

interface imageProps {
  image: Image
}

export default function CollectionPicture({ image }: imageProps) {
  return (
    <div className='w-1/4 mt-2 flex flex-col items-center mx-2'>
      <img src={image.picture_path} className='w-full h-auto max-h-60' />

      <div className='flex items-center'>
        <Image
          src='/images/like.svg'
          alt='like'
          width={40}
          height={40}
          className='mr-2'
        />
        <p>{image.likes.length}</p>
      </div>
      <PictureComment image={image} />
    </div>
  )
}
