import Contest from '../components/Contest'
import Layout from '../components/Layout'
import { getContestList } from '../services/reventService'
import React, { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'

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

  useEffect(() => {
    // When hiding the filters, reset them
    if (open == false) {
      setStatusFilter('All')
    }
  }, [open])

  return (
    <Layout>
      <div className='p-8 bg-gray-100'>
        <div className='px-8'>
          <div className='flex-row'>
            <button
              className='text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
              onClick={() => setOpen(!open)}
            >
              Filters
            </button>

            <SearchInput />
            {open && (
              <div>
                <button
                  className={
                    statusFilter === 'All'
                      ? 'text-orange-500 bg-orange-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                      : 'text-gray-700 bg-gray-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                  }
                  onClick={() => handleStatusFilter('All')}
                >
                  All
                </button>
                <button
                  className={
                    statusFilter === 'Open'
                      ? 'text-orange-500 bg-orange-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                      : 'text-gray-700 bg-gray-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                  }
                  onClick={() => handleStatusFilter('Open')}
                >
                  Open
                </button>
                <button
                  className={
                    statusFilter === 'Voting'
                      ? 'text-orange-500 bg-orange-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                      : 'text-gray-700 bg-gray-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                  }
                  onClick={() => handleStatusFilter('Voting')}
                >
                  Voting
                </button>
                <button
                  className={
                    statusFilter === 'Closed'
                      ? 'text-orange-500 bg-orange-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                      : 'text-gray-700 bg-gray-700 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2'
                  }
                  onClick={() => handleStatusFilter('Closed')}
                >
                  Closed
                </button>
              </div>
            )}
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

  return {
    props: {
      contestList,
    },
  }
}
