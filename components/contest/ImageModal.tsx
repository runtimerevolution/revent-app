import { useMutation } from '@apollo/client'
import { USER_INFO } from 'hooks/auth'
import { ADD_VOTE } from 'lib/graphql'
import React from 'react'
import toast from 'react-hot-toast'

export default function ImageModal({
  closeImageModal,
  selectedImage,
  contest,
  nextImage,
  previousImage,
  refetch = null,
}) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
  const [addVote] = useMutation(ADD_VOTE)

  const handleAddVote = async () => {
    try {
      const { data } = await addVote({
        variables: {
          contestSubmission: selectedImage.id,
          user: localStorage.getItem(USER_INFO),
        },
      })
      if (data['contest_submission_add_vote']['results'] === null) {
        toast.error(data['contest_submission_add_vote']['errors'])
      } else {
        toast.success('Thank you for your vote')
        refetch()
      }
    } catch (error) {
      toast.error('Failed to vote')
    }
  }

  return (
    <>
      <div
        className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 '
        onClick={closeImageModal}
      >
        <div className='modal-container'>
          <div className='relative modal-content bg-white'>
            <img
              src={awsEnv + selectedImage.picture.file}
              alt={`Image ${selectedImage.id}`}
              className='w-auto max-h-80'
            />
            <div
              className='absolute top-0 -left-32 mt-32 bg-white w-12 z-2 rounded-full'
              onClick={previousImage}
            >
              <img src='/images/chevronleft.svg' />
            </div>
            <div
              className='absolute top-0 -right-32 mt-32 bg-white w-12 z-2 rounded-full'
              onClick={nextImage}
            >
              <img src='/images/chevronright.svg' />
            </div>
            {(contest?.status == 'voting' || contest?.internal_status == 'draw') && (
              <div className='absolute w-full'>
                <div className='mt-16 grid grid-cols-6'>
                  <div className='col-start-2 col-span-4'>
                    <button
                      className='bg-forest-green border-white border-2 text-white px-3 py-2 rounded-full font-inter cursor-pointer w-full'
                      type='submit'
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddVote()
                      }}
                    >
                      VOTE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
