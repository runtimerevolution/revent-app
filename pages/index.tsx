import PropTypes from 'prop-types'
import Contest from '../components/Contest'
import Layout from '../components/Layout'
import { getContestList } from '../services/reventService'
import React, { useState, useEffect } from 'react'

export default function Home(props) {
  const { contestList } = props

  const [statusFilter, setStatusFilter] = useState('All')

  const [open, setOpen] = useState(false)

  const filteredContestList = contestList.filter(
    (contest) => statusFilter === 'All' || contest.status === statusFilter
  )

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
  }

  return (
    <Layout>
      <div className='p-8 bg-gray-100'>
        <div className='px-8'>
          <button onClick={() => setOpen(!open)}>Filters</button>
          {open && (
            <div>
              <button onClick={() => handleStatusFilter('All')}>All</button>
              <button onClick={() => handleStatusFilter('Open')}>Open</button>
              <button onClick={() => handleStatusFilter('Voting')}>
                Voting
              </button>
              <button onClick={() => handleStatusFilter('Closed')}>
                Closed
              </button>
            </div>
          )}
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

  return {
    props: {
      contestList,
    },
  }
}

// Home.propTypes = { contestList: PropTypes.array }
// RenderContest.propTypes = { contest: PropTypes.object }
