import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import { IFilter } from '../components/helpers/interfaces'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_LIST } from '../lib/graphql'
import ContestCard from '../components/ContestCard'

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONTEST_LIST)

  const [statusFilter, setStatusFilter] = useState<IFilter>('open')

  const [isSearch, setIsSearch] = useState<boolean>(false)

  const [searchData, setSearchData] = useState([])

  const [open, setOpen] = useState<boolean>(false)

  const contestListing = data?.contests

  let filteredContestList = []

  // console.log('searchData', searchData)

  if (!isSearch) {
    filteredContestList =
      statusFilter === 'All'
        ? contestListing
        : contestListing?.filter((contest) => contest.status === statusFilter)
  } else if (isSearch) {
    filteredContestList = searchData
    // statusFilter === 'All'
    //   ? searchData
    //   : searchData?.filter((contest) => contest.status === statusFilter)
    console.log(
      'filteredContestList } else if (searchData) {',
      filteredContestList
    )
  }

  console.log('isSearch', isSearch)

  // console.log('filteredContestList', filteredContestList)
  // console.log('searchData', searchData)

  // let searchFilteredContestList

  // if (searchData) {
  //   searchFilteredContestList =
  //     statusFilter === 'All'
  //       ? searchData
  //       : searchData?.filter((contest) => contest.status === statusFilter)
  // }

  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <div className='flex-row'>
          <ContestFilter
            setSearchData={setSearchData}
            open={open}
            setOpen={setOpen}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setIsSearch={setIsSearch}
          />
        </div>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          {loading && <p>Loading</p>}
          {error && <p>Error while retrieving the contests</p>}
          <div className='grid grid-cols-4 gap-4'>
            {!loading &&
              !error &&
              filteredContestList?.map((contest) => (
                <ContestCard contest={contest} />
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}
