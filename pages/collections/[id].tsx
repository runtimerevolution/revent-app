import React from 'react'
import { useRouter } from 'next/router'
import { GET_COLLECTION_DETAIL } from '../../lib/graphql'
import { useQuery } from '@apollo/client'
import CollectionPicture from '../../components/CollectionPicture'

export default function CollectionDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const collectionID = parseInt(id as string, 10)

  const { loading, error, data } = useQuery(GET_COLLECTION_DETAIL, {
    variables: { id: collectionID },
  })

  const collectionDetail = data?.collections[0]

  const pictureList = data?.collections[0].pictures

  const pictureCover =
    collectionDetail?.pictures?.[0]?.picture_path !== undefined
      ? collectionDetail?.pictures?.[0]?.picture_path
      : '/images/placeholder.svg'

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
                  src={pictureCover}
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
                  {pictureList?.map((image) => (
                    <CollectionPicture image={image} />
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
