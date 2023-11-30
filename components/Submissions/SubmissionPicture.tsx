import React from 'react'
import { User } from '../helpers/interfaces'

interface Picture {
  file: string
  user: User
  submissionDate: string
}

interface Image {
  id: number
  submissionDate: string
  picture: Picture
}

interface SubmissionPictureProps {
  image: Image
  setSelectedImage: React.Dispatch<React.SetStateAction<Image>>
  contestStatus: string
}

export default function SubmissionPicture({
  image,
  setSelectedImage,
  contestStatus,
}: SubmissionPictureProps) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }
  return (
    <div className='items-center mx-2 max-w-10 h-full'>
      <img
        src='/images/zoomin.svg'
        className='absolute rounded-full top-2 right-2 z-10'
      />
      <img
        src={awsEnv + image.picture.file}
        alt={`Image ${image.id}`}
        className={'w-full mb-0 ' + (contestStatus == 'voting' ? 'h-5/6' : 'h-full')}
        onClick={() => handleImageClick(image)}
      />
      {contestStatus == 'voting' &&
        <div className='flex items-center justify-center h-1/6 z-0'>
          <button
            className='mt-2 text-gray-700 bg-[#00B05C] text-white px-3 py-2 rounded-b-md font-inter cursor-pointer w-full mt-0'
            type='submit'
          >
            Vote
          </button>
        </div>
      }
    </div>
  )
}
