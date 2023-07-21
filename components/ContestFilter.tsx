import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { ContestFilterProps, IFilter } from './helpers/interfaces'
import CreateContestForm from './Navbar/CreateContestForm'
import SearchInput from './SearchInput'

export default function ContestFilter({
  open,
  setOpen,
  statusFilter,
  setStatusFilter,
  setSearchData,
  setIsSearching,
}: ContestFilterProps) {
  const filterMapping: { [key: string]: IFilter } = {
    All: 'All',
    Open: 'open',
    Voting: 'voting',
    Closed: 'closed',
    Schedule: 'schedule',
  }

  const handleStatusFilter = (status: string) => {
    const lowercaseStatus = filterMapping[status]
    setStatusFilter(lowercaseStatus)
  }

  const selectedFilterCSS = (filter) => {
    const lowercaseFilter = filterMapping[filter]
    if (lowercaseFilter === statusFilter) {
      return 'text-orange-500 bg-orange-700'
    }
    return 'text-gray-700 bg-gray-700'
  }

  const filterList = ['Open', 'All', 'Voting', 'Closed', 'Schedule']

  const [showContestCreationModal, setshowContestCreationModal] =
    useState<boolean>(false)

  const toggleCreateContestForm = () => {
    setshowContestCreationModal(
      (showContestCreationModal) => !showContestCreationModal
    )
  }

  return (
    <>
      <div className='flex-row'>
        <button
          className='text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
          onClick={() => setOpen(!open)}
        >
          Filters
        </button>

        <button
          className='text-gray-700 bg-orange-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
          onClick={toggleCreateContestForm}
        >
          <Image
            src='/images/plussign.svg'
            alt='plus'
            width={15}
            height={15}
            className='rounded-full'
          />
        </button>
        <SearchInput
          setSearchData={setSearchData}
          setIsSearching={setIsSearching}
        />
      </div>
      {showContestCreationModal && (
        <CreateContestForm
          setshowContestCreationModal={setshowContestCreationModal}
        />
      )}
      {open && (
        <>
          {filterList.map((filter: string) => (
            <button
              className={`${selectedFilterCSS(
                filter
              )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
              onClick={() => handleStatusFilter(filter as IFilter)}
            >
              {filter}
            </button>
          ))}
        </>
      )}
    </>
  )
}
