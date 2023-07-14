import Contest from '../components/Contest'
import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import {
  IFilter,
  Contest as ContestType,
} from '../components/helpers/interfaces'
import { useQuery } from '@apollo/client'
import { getContestList } from '../services/reventService'
import { GET_CONTEST_LIST } from '../lib/graphql'
import ContestDetail from '../components/Contest'

export interface HomeProps {
  contestList: ContestType[]
}
export default function Home({ contestList }: HomeProps) {
  const { loading, error, data } = useQuery(GET_CONTEST_LIST)

  const [statusFilter, setStatusFilter] = useState<IFilter>('open')

  const [open, setOpen] = useState<boolean>(false)

  const contestListing = data?.contests

  const filteredContestList =
    statusFilter === 'All'
      ? contestListing
      : contestListing?.filter((contest) => contest.status === statusFilter)

  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8'>
        <div className='flex-row'>
          <ContestFilter
            open={open}
            setOpen={setOpen}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
          {loading && <p>Loading</p>}
          {error && <p>Error while retrieving the contests</p>}
          <div className='grid grid-cols-4 gap-4'>
            {!loading &&
              !error &&
              filteredContestList.map((contest) => (
                <ContestDetail contest={contest} />
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let contestList = []

  try {
    contestList = await getContestList()
  } catch (err) {
    console.log('Error', err)
  }

  return {
    props: {
      contestList,
    },
  }
}
