import React from 'react'
import { User } from '../helpers/interfaces'
import { useState } from 'react'
import { USER_INFO } from 'hooks/auth'

interface Picture {
  file: string
  user: User
  submissionDate: string
  votes: Array<string>
}

interface Image {
  id: number
  submissionDate: string
  picture: Picture
}

interface Contest {
  status: string,
  internal_status: string,
  winners: Array<string>
}

interface SubmissionPictureProps {
  image: Image
  setSelectedImage: React.Dispatch<React.SetStateAction<Image>>
  contestInfo: Contest
}

export default function SubmissionPicture({
  image,
  setSelectedImage,
  contestInfo,
}: SubmissionPictureProps) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
  const [ratio, setRatio] = useState('width')
  const imageComponentID = 'image-' + String(image.id)
  const user = localStorage.getItem(USER_INFO)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }
  const winner = contestInfo.winners ? contestInfo.winners.findIndex((element) => element.id == image.picture.user.id) : -1
  const vote = image.votes ? image.votes.findIndex((element) => element.id == user) : -1
  return (
    <div
      key={image.id}
      className={ratio == 'width' ? 'row-span-3' : 'row-span-4'}
    >
      <div
        className='relative items-center mx-2 max-w-10 h-full'
        onClick={() => handleImageClick(image)}
      >
        <div className='absolute top-2 right-2 z-10'>
          <div className='w-8 rounded-full'>
            <img src='/images/zoomin.svg' />
          </div>
        </div>
        <img
          id={imageComponentID}
          src={awsEnv + image.picture.file}
          alt={`Image ${image.id}`}
          className={'relative top-0 w-full mb-0 h-full rounded-xl'}
          onLoad={(e) => {
            if (e.target.naturalHeight > e.target.naturalWidth) {
              setRatio('height')
            }
          }}
        />
        {(contestInfo?.status == "voting" || contestInfo?.internal_status == 'draw') && user && vote != -1 && (
          <div className='absolute top-0 w-full h-full border-4 border-forest-green rounded-xl flex items-center justify-center'>
            <img src='/images/check_circle.svg' className='h-2/3' />
          </div>
        )}

        {contestInfo?.status == "closed" && contestInfo?.internal_status == 'closed' && winner != -1 && (
          <div className='absolute top-0 w-full h-full border-4 border-yellow rounded-xl flex items-center justify-center'>
            <img src='/images/winner_heart.svg' className='h-2/3' />
          </div>
        )}
      </div>
    </div >
  )
}
