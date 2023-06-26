import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_DETAIL, GET_CONTEST_SUBMISSIONS } from '../../lib/graphql'

export default function ContestDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

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
  } = useQuery(GET_CONTEST_SUBMISSIONS, {
    variables: { id: contestID },
  })

  const submissionList = submissionData?.contest_submissions

  return (
    <>
      {loadingDetail && <p>Loading</p>}
      {errorDetail && <p>Error while retrieving the contest</p>}
      {!loadingDetail && !errorDetail && (
        <>
          <div className='w-full  justify-center h-full bg-gray-200'>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
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
              <div className='mt-6 h-screen'>
                <div className='mt-2 flex flex-wrap'>
                  {loadingSubmission && <p>Loading</p>}
                  {errorSubmission && (
                    <p>Error while retrieving the contest submissions</p>
                  )}

                  {!loadingSubmission && !errorSubmission && (
                    <>
                      {submissionList?.map((image) => (
                        <div
                          key={image.id}
                          className='w-1/4 mt-2 flex flex-col items-center mx-2'
                        >
                          <img
                            src={image.picture.picture_path}
                            alt={`Image ${image.id}`}
                            className='w-full h-auto max-h-60'
                          />
                          <p className='mt-2 text-center'>
                            User: {image.picture.user.name_first}{' '}
                            {image.picture.user.name_last}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
