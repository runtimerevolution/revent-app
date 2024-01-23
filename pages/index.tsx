import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import { IFilter } from '../components/helpers/interfaces'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_LIST } from '../lib/graphql'
import ContestList from '../components/ContestList'

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONTEST_LIST)

  const [statusFilter, setStatusFilter] = useState<IFilter>('All')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchData, setSearchData] = useState([])
  const [open, setOpen] = useState<boolean>(false)

  const contestListing = data?.contests

  let filteredContestList = []

  if (!isSearching) {
    filteredContestList =
      statusFilter === 'All'
        ? contestListing
        : contestListing?.filter((contest) => contest.status === statusFilter)
  } else if (isSearching) {
    filteredContestList =
      statusFilter === 'All'
        ? searchData
        : searchData?.filter((contest) => contest.status === statusFilter)
  }

  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <div className='flex-row px-20'>
          <ContestFilter
            setSearchData={setSearchData}
            open={open}
            setOpen={setOpen}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setIsSearching={setIsSearching}
          />
        </div>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          {loading && <p>Loading</p>}
          {error && <p>Error while retrieving the contests</p>}

          <ContestList filteredContestList={filteredContestList} />
        </main>
      </div>
    </div>
  )
}
