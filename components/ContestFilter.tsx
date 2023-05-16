import React from 'react'
import { ContestFilterProps, IFilter } from './helpers/interfaces'
import SearchInput from './SearchInput'

export default function ContestFilter({
  open,
  setOpen,
  statusFilter,
  setStatusFilter,
}: ContestFilterProps) {
  const handleStatusFilter = (status: IFilter) => {
    setStatusFilter(status)
  }

  const selectedFilterCSS = (filter: IFilter) => {
    if (filter === statusFilter) {
      return 'text-orange-500 bg-orange-700'
    }
    return 'text-gray-700 bg-gray-700'
  }

  const filterList = ['Open', 'All', 'Voting', 'Closed']

  return (
    <>
      <div className='flex-row'>
        <button
          className='text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
          onClick={() => setOpen(!open)}
        >
          Filters
        </button>

        <SearchInput />
      </div>
      {open && (
        <>
          {filterList.map((filter: IFilter) => (
            <button
              className={`${selectedFilterCSS(
                filter
              )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
              onClick={() => handleStatusFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </>
      )}
    </>
  )
}
