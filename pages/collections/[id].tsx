import React from 'react'
import { useRouter } from 'next/router'
import { GET_COLLECTION_DETAIL, GET_PICTURE_COMMENTS } from '../../lib/graphql'
import { useQuery } from '@apollo/client'
import PictureComment from '../../components/helpers/PictureComment'

export default function CollectionDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const collectionID = parseInt(id as string, 10)

  const { loading, error, data } = useQuery(GET_COLLECTION_DETAIL, {
    variables: { id: collectionID },
  })

  const collectionDetail = data?.collections[0]

  const pictureList = data?.collections[0].pictures

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>Error while retrieving the collection</p>}
      {!loading && !error && (
        <>
          <div className='w-full  justify-center h-full bg-gray-200'>
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
              <div className='mt-6 h-screen'>
                <div className='mt-2 flex flex-wrap'>
                  {loading && <p>Loading</p>}
                  {error && (
                    <p>Error while retrieving the contest submissions</p>
                  )}

                  {!loading && !error && (
                    <>
                      {pictureList?.map((image) => (
                        <div
                          key={image.id}
                          className='w-1/4 mt-2 flex flex-col items-center mx-2'
                        >
                          <img
                            src={image.picture_path}
                            alt={`Image ${image.id}`}
                            className='w-full h-auto max-h-60'
                          />
                          <p>Likes: {image.likes.length}</p>
                          <PictureComment image={image} />
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
