import Collection from '../../components/Collection'
import Layout from '../../components/Layout'
import { getCollectionList } from '../../services/reventService'

export default function Collections(props) {
  const { collectionList } = props

  return (
    <Layout>
      <div className='p-8 bg-gray-100'>
        <div className='px-8'>
          <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
            <div className='grid grid-cols-4 gap-4'>
              {collectionList?.map((collection) => (
                <Collection collection={collection} key={collection.id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  let collectionList = null

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
