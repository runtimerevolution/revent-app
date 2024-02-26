import { MyPhoto as MyPhotoType } from '../../components/helpers/interfaces'
import MyPhoto from '../../components/MyPhotos'
import { getMyPhotosList } from '../../services/reventService'

export interface MyPhotosProps {
  myphotosList: MyPhotoType[]
}

export default function MyPhotos({ myphotosList }: MyPhotosProps) {
  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          <div className='grid grid-cols-4 gap-4'>
            {myphotosList.map((myphoto, key) => (
              <MyPhoto myphoto={myphoto} key={myphoto.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let myphotosList = []

  try {
    myphotosList = await getMyPhotosList()
  } catch (err) {
    console.log('Error', err)
  }

  return {
    props: {
      myphotosList,
    },
  }
}
