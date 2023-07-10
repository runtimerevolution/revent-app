import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_DETAIL, GET_CONTEST_SUBMISSIONS } from '../../lib/graphql'
import { useState, useEffect } from 'react'
import SubmissionForm from '../../components/Submissions/SubmissionForm'
import SubmissionPicture from '../../components/Submissions/SubmissionPicture'

export default function ContestDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

  const [showAddPhotoForm, setShowAddPhotoForm] = useState<boolean>(false)

  const {
    loading: loadingDetail,
    error: errorDetail,
    data: contestData,
  } = useQuery(GET_CONTEST_DETAIL, {
    variables: { id: contestID },
  })

  const contestDetail = contestData?.contests[0]

  const {
    loading: loadingSubmission,
    error: errorSubmission,
    data: submissionData,
    refetch: refetchContest,
  } = useQuery(GET_CONTEST_SUBMISSIONS, {
    variables: { id: contestID },
  })

  const submissionList = submissionData?.contest_submissions

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
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

  const toggleAddPhotoForm = () => {
    setShowAddPhotoForm((showContestCreationModal) => !showContestCreationModal)
  }
  return (
    <>
      {loadingDetail && <p>Loading</p>}
      {errorDetail && <p>Error while retrieving the contest</p>}
      {!loadingDetail && !errorDetail && (
        <>
          <div className='w-full justify-center h-full '>
            <button
              className='m-4 text-gray-700 bg-orange-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
              onClick={toggleAddPhotoForm}
            >
              Add New Picture
            </button>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
              {showAddPhotoForm && (
                <>
                  <SubmissionForm
                    contestID={contestID}
                    setShowAddPhotoForm={setShowAddPhotoForm}
                  />
                </>
              )}
              <div className='flex justify-center items-center'>
                <img
                  src={contestDetail?.cover_picture?.picture_path}
                  alt='Imagem'
                  className='object-fill h-64 w-96'
                />
              </div>
              <p className='text-center mt-4 text-2xl font-bold'>
                {contestDetail?.title}
              </p>
              <p className='text-center mt-2 text-lg'>
                {contestDetail?.description}
              </p>
              <div className='mt-6'>
                <div className='mt-2 flex flex-wrap'>
                  {loadingSubmission && <p>Loading</p>}
                  {errorSubmission && (
                    <p>Error while retrieving the contest submissions</p>
                  )}

                  {!loadingSubmission && !errorSubmission && (
                    <>
                      {submissionList?.map((image) => (
                        <SubmissionPicture
                          image={image}
                          setSelectedImage={setSelectedImage}
                        />
                      ))}
                    </>
                  )}
                </div>
                {selectedImage && (
                  <div
                    className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 '
                    onClick={closeImageModal}
                  >
                    <div className='modal-container'>
                      <div className='modal-content bg-white p-4'>
                        <img
                          src={selectedImage.picture.picture_path}
                          alt={`Image ${selectedImage.id}`}
                          className='w-auto max-h-80'
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
