import React, { useEffect, useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_LIST } from '../lib/graphql'
import ContestList from '../components/ContestList'
import { Filter } from 'types'

interface Contest {
  id: number
  title: string
  description: string
  prize: string
  upload_phase_end: string
  upload_phase_start: string
  voting_phase_end: string
  voting_draw_end: string
  cover_picture: {
    file: string
  }
  internal_status: string
  status: string
}

export default function Home() {
  const { loading, error, data } = useQuery<{ contests: Contest[] }>(
    GET_CONTEST_LIST
  )
  const [statusFilter, setStatusFilter] = useState<Filter>('all')
  const [filteredContests, setFilteredContests] = useState<Contest[]>([])

  useEffect(() => {
    if (data) {
      const contests = data.contests
      if (statusFilter === 'all') {
        setFilteredContests(contests)
      } else if (statusFilter) {
        setFilteredContests(
          contests.filter((contest: Contest) => {
            return contest.status === statusFilter
          })
        )
      }
    }
  }, [statusFilter, data])

  return (
    <div className='px-5 py-7'>
      <ContestFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <main className='flex flex-col md:px-20'>
        {loading && <p>Loading</p>}
        {error && <p>Error while retrieving the contests</p>}

        {data && <ContestList contestList={filteredContests} />}
      </main>
    </div>
  )
}
