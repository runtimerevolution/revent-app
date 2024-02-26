import React from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_SUBMISSIONS } from 'lib/graphql'
import { useState, useEffect } from 'react'
import SubmissionPicture from 'components/Submissions/SubmissionPicture'
import ImageModal from 'components/contest/ImageModal'

export default function ContestDraw({ contest }) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
  const [order, setOrder] = useState([])

  const {
    loading: loadingSubmission,
    error: errorSubmission,
    data: submissionData,
    refetch: refetchSubmissions,
  } = useQuery(GET_CONTEST_SUBMISSIONS, {
    variables: {
      filters: {
        contest: { id: contest?.id },
        draw: true,
      },
      order: order.length > 0 ? order : null,
    },
  })

  const submissionList = submissionData?.contest_submissions

  const [selectedImage, setSelectedImage] = useState(null)
  const [showNextImage, setShowNextImage] = useState(null)
  const imageList = []
  let imageIDList = []

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const imageIndex = (image) => image == selectedImage

  const previousImage = () => {
    const index = imageList.findIndex(imageIndex)
    if (index == 0) {
      setShowNextImage(imageList[imageList.length - 1])
    } else {
      setShowNextImage(imageList[index - 1])
    }
  }

  const nextImage = () => {
    const index = imageList.findIndex(imageIndex)
    closeImageModal()
    if (index + 1 == imageList.length) {
      setShowNextImage(imageList[0])
    } else {
      setShowNextImage(imageList[index + 1])
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        closeImageModal()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (showNextImage && !selectedImage) {
      setSelectedImage(showNextImage)
      setShowNextImage(null)
    }
  }, [showNextImage])

  useEffect(() => {
    if (
      imageList.length == imageIDList.length &&
      imageList.length != order.length
    ) {
      setOrder(imageIDList)
    }
  }, [imageList])

  const date = new Date(contest?.upload_phase_start)
  const month = date ? date.toLocaleString('default', { month: 'long' }) : ''

  const contest_info = {
    status: contest?.status,
    internal_status: contest?.internal_status,
    winners: contest?.winners,
  }

  return (
    <>
      <div className='w-full flex justify-center h-full bg-white p-8 rounded-lg'>
        <div className='w-10/12'>
          <div className='flex justify-center items-center'>
            <div className='relative w-full'>
              <img
                src={awsEnv + contest?.cover_picture?.file}
                alt='Imagem'
                className='object-fill h-64 w-full rounded-xl'
              />
              <div className='absolute top-6 left-16'>
                <div className='mb-2'>
                  <p className='font-inter text-light-grey'>{month}</p>
                </div>
                <div className='flex bg-light-orange px-2 rounded-full'>
                  <Image
                    src='/images/clock.svg'
                    alt='plus'
                    width={20}
                    height={20}
                    className='rounded-full'
                  />
                  <p className='text-center font-inter ml-1 text-white'>
                    {'Tied Contest'}
                  </p>
                </div>
              </div>
              <div className='absolute top-0 left-0 h-full w-full grid grid-rows-2 content-center'>
                <div className='flex w-full'>
                  <p className='text-center text-2xl font-bold text-white -mt-2 self-end w-full'>
                    {contest?.title}
                  </p>
                </div>
                <div>
                  <p className='text-center mt-2 text-lg text-white'>
                    {contest?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <div className='grid grid-cols-4 gap-4 mt-4'>
              {loadingSubmission && <p>Loading</p>}
              {errorSubmission && (
                <p>Error while retrieving the contest submissions</p>
              )}

              {!loadingSubmission && !errorSubmission && (
                <>
                  {submissionList?.map((image, key) => {
                    imageList.push(image)
                    imageIDList.push(image?.id)
                    return (
                      <SubmissionPicture
                        key={key}
                        image={image}
                        setSelectedImage={setSelectedImage}
                        contestInfo={contest_info}
                      />
                    )
                  })}
                </>
              )}
            </div>
            {selectedImage && (
              <ImageModal
                closeImageModal={closeImageModal}
                selectedImage={selectedImage}
                contest={contest}
                previousImage={previousImage}
                nextImage={nextImage}
                refetch={refetchSubmissions}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
