import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_DETAIL, GET_CONTEST_SUBMISSIONS } from '../../lib/graphql'
import { useState, useEffect } from 'react'
import ContestVoting from './ContestVoting'

export default function ContestDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL

  const [showAddPhotoForm, setShowAddPhotoForm] = useState<boolean>(false)

  const {
    loading: loadingDetail,
    error: errorDetail,
    data: contestData,
  } = useQuery(GET_CONTEST_DETAIL, {
    variables: { filters: { id: contestID } },
  })

  const contestDetail = contestData?.contests[0]

  return (
    <>
      {loadingDetail && <p>Loading</p>}
      {errorDetail && <p>Error while retrieving the contest</p>}
      {!loadingDetail && !errorDetail && (
        <>
          <ContestVoting contest={contestDetail} />
        </>
      )}
    </>
  )
}
