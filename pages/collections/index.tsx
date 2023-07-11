import { useQuery } from '@apollo/client'
import Collection from '../../components/Collection'
import { GET_COLLECTION_LIST } from '../../lib/graphql'

export default function Collections() {
  const { loading, error, data } = useQuery(GET_COLLECTION_LIST)

  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          {loading && <p>Loading</p>}
          {error && <p>Error while retrieving the collections</p>}

          <div className='grid grid-cols-4 gap-4'>
            {data?.collections.map((collection) => (
              <Collection collection={collection} key={collection.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
