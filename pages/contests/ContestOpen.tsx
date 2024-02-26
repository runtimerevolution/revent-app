import React from 'react'
import Image from 'next/image'
import DragAndDrop from 'components/contest/DragAndDrop'
import { useProfile } from 'hooks/auth'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_SUBMISSIONS } from 'lib/graphql'

export default function ContestOpen({ contest }) {
  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
  const profile = useProfile()

  const {
    loading: loadingSubmission,
    error: errorSubmission,
    data: submissionData,
    refetch: refetchContestSubmission,
  } = useQuery(GET_CONTEST_SUBMISSIONS, {
    variables: {
      filters: {
        contest: { id: contest?.id },
        picture: { user: { id: profile.data?.id } },
      },
    },
    skip: profile.isLoading || profile.isError,
  })

  var date = new Date(contest?.upload_phase_start)
  var month = date ? date.toLocaleString('default', { month: 'long' }) : ''
  return (
    <>
      <div
        className={
          'w-full flex justify-center bg-white p-8 rounded-lg' +
          (profile.isSuccess ? 'h-full' : 'h-screen')
        }
      >
        <div className={'w-10/12 ' + (profile.isSuccess ? '' : 'h-screen')}>
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
                <div className='flex bg-forest-green px-2 rounded-full'>
                  <Image
                    src='/images/curved_camera.svg'
                    alt='plus'
                    width={20}
                    height={20}
                    className='rounded-full'
                  />
                  <p className='text-center font-inter ml-1 text-white'>
                    {'Contest open'}
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
          {profile.isSuccess && !loadingSubmission && !errorSubmission && (
            <div className='mt-6'>
              <DragAndDrop
                submission={
                  submissionData['contest_submissions'].length > 0
                    ? submissionData['contest_submissions'][0]
                    : null
                }
                contest={contest}
                refetch={refetchContestSubmission}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
