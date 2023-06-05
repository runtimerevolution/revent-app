import Contest from '../components/Contest'
import { getContestList } from '../services/reventService'
import React, { useState } from 'react'
import ContestFilter from '../components/ContestFilter'
import { IFilter } from '../components/helpers/interfaces'
import { useQuery } from '@apollo/client'
import { GET_CONTESTS, GET_USERS } from '../lib/graphql'

export default function Home() {
  const { loading, error, data: contests } = useQuery(GET_CONTESTS)

  const [statusFilter, setStatusFilter] = useState<IFilter>('Open')

  const [open, setOpen] = useState<boolean>(false)

  // const [openContest, setOpenContest] = useState([])
  // const [closedContest, setClosedContest] = useState([])
  // const [votingContest, setVotingContest] = useState([])

  // useEffect(() => {
  //   {
  //     contests?.contests?.map((contest) => {
  //       if (new Date(contest.voting_phase_end) > new Date()) {
  //         closedContest.push(contest)
  //         setClosedContest(closedContest)
  //         console.log('closedContest', closedContest)
  //       }

  //       if (new Date(contest.voting_phase_end) < new Date()) {
  //         openContest.push(contest)
  //         setOpenContest(openContest)
  //         console.log('openContest', openContest)
  //       }
  //     })
  //   }
  // }, [contests])

  // const filteredContestList =
  //   statusFilter === 'All'
  //     ? contestList
  //     : contestList.filter((contest) => contest.status === statusFilter)

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
          <div className='grid grid-cols-4 gap-4 	'>
            {contests?.contests?.map((contest) => (
              <Contest contest={contest} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
