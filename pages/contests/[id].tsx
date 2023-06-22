import React from 'react'
import { useRouter } from 'next/router'
import { GET_CONTEST } from '../../lib/graphql'
import { useQuery } from '@apollo/client'

export default function DetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

  const { loading, error, data } = useQuery(GET_CONTEST, {
    variables: { id: contestID },
  })

  const contestDetail = data?.contests[0]

  // To be replaced with the ContestSubmission Pictures
  const imageList = [
    { id: 1, picture_path: '/images/contest.jpeg' },
    { id: 2, picture_path: '/images/contest.jpeg' },
    { id: 3, picture_path: '/images/contest.jpeg' },
    { id: 4, picture_path: '/images/contest.jpeg' },
    { id: 5, picture_path: '/images/contest.jpeg' },
  ]

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>Error while retrieving the contest</p>}
      {!loading && !error && (
        <>
          <div className='w-full flex justify-center  h-full bg-gray-200'>
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
              <div className='mt-6'>
                <div className='flex flex-wrap mt-2 -mx-2'>
                  {imageList.map((image) => (
                    <div
                      key={image.id}
                      className='w-1/4 px-2 flex flex-col items-center mt-2'
                    >
                      <img
                        src={image.picture_path}
                        alt={`Image ${image.id}`}
                        className='w-full h-auto'
                      />
                      <p className='mt-2 text-center'>{`Image ${image.id} Title`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
