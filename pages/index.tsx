import Contest from '../components/Contest'
import Layout from '../components/Layout'
import { getContestList } from '../services/reventService'
import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import { HomeProps, IFilter } from '../components/helpers/interfaces'

export default function Home({ contestList }: HomeProps) {
  const [statusFilter, setStatusFilter] = useState<IFilter>('Open')

  const [open, setOpen] = useState<boolean>(false)

  const filteredContestList =
    statusFilter === 'All'
      ? contestList
      : contestList.filter((contest) => contest.status === statusFilter)

  return (
    <Layout>
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
          <div className='grid grid-cols-4 gap-4 px-20'>
            {filteredContestList.map((contest) => (
              <Contest contest={contest} index={contest.id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
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
