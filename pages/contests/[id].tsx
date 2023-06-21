import React from 'react'
import { useRouter } from 'next/router'
import { getContestById } from '../../services/reventService'
import { GET_CONTEST } from '../../lib/graphql'
import { useQuery } from '@apollo/client'

export default function DetailPage(contest) {
  const router = useRouter()
  const { id } = router.query

  let contestID: number | undefined
  if (Array.isArray(id)) {
    contestID = parseInt(id[0])
  } else {
    contestID = parseInt(id)
  }

  const { loading, error, data } = useQuery(GET_CONTEST, {
    variables: { id: contestID },
  })

  const contestDetail = data?.contests
  console.log('contestDetail', contestDetail)

  return (
    <>
      <div className='h-screen bg-gray-200'>
        <div className='flex justify-center items-center bg-gray-200 p-4 rounded-lg flex items-center'>
          <img
            src={contestDetail?.cover_picture?.picture_path}
            alt='Imagem'
            className='w-48 h-auto'
          />
        </div>
        <p className='ml-4'>{contestDetail?.title}</p>
        <p className='ml-4'>{contestDetail?.description}</p>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id, 10)

  const contest = await getContestById(id)

  if (!contest) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      contest,
    },
  }
}
