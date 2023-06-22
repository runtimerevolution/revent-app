import React from 'react'
import { useRouter } from 'next/router'
import { GET_COLLECTION } from '../../lib/graphql'
import { useQuery } from '@apollo/client'

export default function CollectionDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const collectionID = parseInt(id as string, 10)
  console.log('id COLLECTION', id)

  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { id: collectionID },
  })

  // console.log('data', data?.collections)

  const collectionDetail = data?.collections[0]

  // To be replaced with Collection Pictures
  const imageList = [
    { id: 1, picture_path: '/images/contest.jpeg' },
    { id: 2, picture_path: '/images/contest.jpeg' },
    { id: 3, picture_path: '/images/contest.jpeg' },
    { id: 4, picture_path: '/images/contest.jpeg' },
    { id: 5, picture_path: '/images/contest.jpeg' },
  ]

  console.log(
    'collectionDetail?.pictures?.[0]?.picture_path',
    collectionDetail?.pictures?.[0]?.picture_path
  )

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>Error while retrieving the collection</p>}
      {!loading && !error && (
        <>
          <div className='w-full flex justify-center  h-full bg-gray-200'>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
              <div className='flex justify-center items-center'>
                <img
                  src={collectionDetail?.pictures?.[0]?.picture_path}
                  alt='Imagem'
                  className='object-fill h-64 w-96'
                />
              </div>
              <p className='text-center mt-4 text-2xl font-bold'>
                {collectionDetail?.id}
              </p>
              <p className='text-center mt-2 text-lg'>
                {collectionDetail?.name}
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
