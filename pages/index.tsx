import Contest from '../components/Contest'
import Layout from '../components/Layout'
import { getContestList } from '../services/reventService'
import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'

export default function Home(props) {
  const { contestList } = props

  const [statusFilter, setStatusFilter] = useState('All')

  const [open, setOpen] = useState<boolean>(false)

  const filteredContestList = contestList.filter(
    (contest) => statusFilter === 'All' || contest.status === statusFilter
  )

  return (
    <Layout>
      <div className='p-8 bg-gray-100'>
        <div className='px-8'>
          <div className='flex-row'>
            <ContestFilter
              contestList={contestList}
              open={open}
              setOpen={setOpen}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          <main className='min-h-screen py-8 px-20 flex-1 flex flex-col'>
            <div className='grid grid-cols-4 gap-4'>
              {filteredContestList?.map((contest) => (
                <Contest contest={contest} key={contest.id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  let contestList = null

  try {
    contestList = await getContestList()
  } catch (err) {
    console.log('Error', err)
  }

  contestList = contestList || []

  return {
    props: {
      contestList,
    },
  }
}
