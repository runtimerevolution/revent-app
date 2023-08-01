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

  const startDateString = contestDetail?.upload_phase_start?.slice(0, 10)
  const startDate = new Date(startDateString)
  const month = startDate.toLocaleString('en-US', { month: 'long' })

  return (
    <>
      {loadingDetail && <p>Loading</p>}
      {errorDetail && <p>Error while retrieving the contest</p>}
      {!loadingDetail && !errorDetail && (
        <>
          <div className='w-full justify-center h-full'>
            {contestDetail?.status == 'open' && (
              <>
                <button
                  className='m-4 text-gray-700 bg-orange-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
                  onClick={toggleAddPhotoForm}
                >
                  Add New Picture
                </button>
              </>
            )}

            <div className='bg-white p-8 rounded-lg shadow-lg'>
              {showAddPhotoForm && (
                <>
                  <SubmissionForm
                    contestID={contestID}
                    setShowAddPhotoForm={setShowAddPhotoForm}
                  />
                </>
              )}
              <div
                className='flex flex-col justify-center items-center relative rounded-lg'
                style={{
                  backgroundImage: `url(${contestDetail?.cover_picture?.picture_path})`,
                  backgroundSize: 'cover',
                  height: '15em',
                }}
              >
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg' />
                <div className='absolute top-10 left-20 text-white z-10 '>
                  <a className=''>{month}</a>
                  {contestDetail.status == 'open' && (
                    <div className='bg-green-500 rounded-full flex items-left absolute left-0'>
                      <img
                        src='/images/curved_camera.svg'
                        className='brightness-100 ml-1'
                        style={{
                          width: '20px',
                          height: '25px',
                        }}
                      />
                      <a className='text-center text-white rounded-lg w-36 text-md '>
                        Open Contest
                      </a>
                    </div>
                  )}
                  {contestDetail.status == 'voting' && (
                    <div className='bg-yellow-500 rounded-full flex items-left absolute left-0'>
                      <img
                        src='/images/clock.svg'
                        className='brightness-100 ml-1'
                        style={{ width: '20px', height: '25px' }}
                      />
                      <a className='text-center text-white rounded-lg w-36 text-md '>
                        Voting Phase
                      </a>
                    </div>
                  )}
                  {contestDetail.status == 'closed' && (
                    <div className='bg-gray-400 text-white rounded-full flex items-left absolute left-0 bg-opacity-70'>
                      <img
                        src='/images/lock_small.svg'
                        className='brightness-100 ml-1'
                        style={{ width: '20px', height: '25px' }}
                      />
                      <a className='text-center text-white rounded-lg w-36 text-md'>
                        Contest Closed
                      </a>
                    </div>
                  )}
                </div>
                <p className='text-center text-white mt-4 text-3xl font-bold z-10'>
                  {contestDetail?.title}
                </p>
                <p className='text-center text-white mt-4 text-md font-bold z-20'>
                  {contestDetail?.description}
                </p>
              </div>

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
