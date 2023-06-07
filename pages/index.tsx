import Contest from '../components/Contest'
import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import {
  IFilter,
  Contest as ContestType,
} from '../components/helpers/interfaces'
import { useQuery } from '@apollo/client'
import { GET_CONTESTS } from '../lib/graphql'
import { getContestList } from '../services/reventService'

export interface HomeProps {
  contestList: ContestType[]
}
export default function Home({ contestList }: HomeProps) {
  const { loading, error, data } = useQuery(GET_CONTESTS)

  const [statusFilter, setStatusFilter] = useState<IFilter>('Open')

  const [open, setOpen] = useState<boolean>(false)

  // let contestList = data?.contests

  const filteredContestList =
    statusFilter === 'All'
      ? contestList
      : contestList.filter((contest) => contest.status === statusFilter)

  return (
    <div className='p-8 bg-gray-100'>
      <div className='px-8 '>
        <div className='flex-row'>
          <ContestFilter
            open={open}
            setOpen={setOpen}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <main className='min-h-screen py-8 px-20 flex-1 flex flex-col '>
          {loading && <p>LOADING</p>}
          {error && <p>Error while retrieving the contests</p>}
          {/* <div className='grid grid-cols-4 gap-4 	'>
            {contestList?.map((contest) => (
              <Contest contest={contest} />
            ))}
          </div> */}
          <div className='grid grid-cols-4 gap-4'>
            {filteredContestList.map((contest) => (
              <Contest contest={contest} />
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
