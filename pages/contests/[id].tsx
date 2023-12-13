import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_DETAIL, GET_CONTEST_SUBMISSIONS } from '../../lib/graphql'
import { useState, useEffect } from 'react'
import ContestVoting from 'pages/contests/ContestVoting'
import ContestOpen from 'pages/contests/ContestOpen'
import ContestClosed from 'pages/contests/ContestClosed'

export default function ContestDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const contestID = parseInt(id as string, 10)

  const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL

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
      {!loadingDetail && !errorDetail && contestDetail?.status == 'open' && (
        <>
          <ContestOpen contest={contestDetail} />
        </>
      )}
      {!loadingDetail && !errorDetail && contestDetail?.status == 'voting' && (
        <>
          <ContestVoting contest={contestDetail} />
        </>
      )}
      {!loadingDetail && !errorDetail && contestDetail?.status == 'closed' && (
        <>
          <ContestClosed contest={contestDetail} />
        </>
      )}
    </>
  )
}
