import Collection from '../../components/Collection'
import { CollectionsProps } from '../../components/helpers/interfaces'
import { getCollectionList } from '../../services/reventService'

export default function Collections({ collectionList }: CollectionsProps) {
  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          <div className='grid grid-cols-4 gap-4'>
            {collectionList.map((collection) => (
              <Collection collection={collection} key={collection.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let collectionList = []

  try {
    collectionList = await getCollectionList()
  } catch (err) {
    console.log('Error', err)
  }

  return {
    props: {
      collectionList,
    },
  }
}
