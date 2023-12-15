import React from 'react'
import { User } from '../helpers/interfaces'
import { useState } from 'react'

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
  const [ratio, setRatio] = useState("width")
  var imageComponentID = 'image-' + String(image.id)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }
  return (
    <div key={image.id} className={ratio == 'width' ? 'row-span-5' : 'row-span-6'}>
      <div className='relative items-center mx-2 max-w-10 h-full' onClick={() => handleImageClick(image)}>
        <div className='absolute top-2 right-2 z-10'>
          <div className='w-8 rounded-full'>
            <img
              src='/images/zoomin.svg'
            />
          </div>
        </div>
        <img
          id={imageComponentID}
          src={awsEnv + image.picture.file}
          alt={`Image ${image.id}`}
          className={'relative top-0 w-full mb-0 h-full'}
          onLoad={(e) => {
            if (e.target.naturalHeight > e.target.naturalWidth) {
              setRatio("height")
            }
          }}
        />
      </div>
    </div>
  )
}
