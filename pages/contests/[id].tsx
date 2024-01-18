import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_DETAIL } from 'lib/graphql'
import ContestVoting from 'pages/contests/ContestVoting'
import ContestOpen from 'pages/contests/ContestOpen'
import ContestClosed from 'pages/contests/ContestClosed'
import ContestDraw from 'pages/contests/ContestDraw'

export default function ContestDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

  const {
    loading: loadingDetail,
    error: errorDetail,
    data: contestData,
  } = useQuery(GET_CONTEST_DETAIL, {
    variables: { filters: { id: contestID } },
  })

  const contestDetail = contestData?.contests[0]
  console.log(contestDetail)

  return (
    <>
      {loadingDetail && <p>Loading</p>}
      {errorDetail && <p>Error while retrieving the contest</p>}
      {!loadingDetail && !errorDetail && contestDetail?.status == 'open' && contestDetail?.internal_status == 'open' && (
        <>
          <ContestOpen contest={contestDetail} />
        </>
      )}
      {!loadingDetail && !errorDetail && contestDetail?.status == 'voting' && contestDetail?.internal_status == 'open' && (
        <>
          <ContestVoting contest={contestDetail} />
        </>
      )}
      {!loadingDetail && !errorDetail && contestDetail?.status == 'closed' && contestDetail?.internal_status == 'closed' && (
        <>
          <ContestClosed contest={contestDetail} />
        </>
      )}
      {!loadingDetail && !errorDetail && contestDetail?.internal_status == 'draw' && (
        <>
          <ContestDraw contest={contestDetail} />
        </>
      )}
    </>
  )
}
