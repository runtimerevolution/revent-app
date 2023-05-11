import React from 'react'
import SearchInput from './SearchInput'

function ContestFilter(props) {
  const { open, setOpen, statusFilter, setStatusFilter } = props

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
  }

  const selectedFilterCSS = (filter) => {
    if (filter === statusFilter) {
      return 'text-orange-500 bg-orange-700'
    }
    return 'text-gray-700 bg-gray-700'
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

        <SearchInput />
      </div>
      {open && (
        <div>
          <button
            className={`${selectedFilterCSS(
              'All'
            )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
            onClick={() => handleStatusFilter('All')}
          >
            All
          </button>
          <button
            className={`${selectedFilterCSS(
              'Open'
            )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
            onClick={() => handleStatusFilter('Open')}
          >
            Open
          </button>
          <button
            className={`${selectedFilterCSS(
              'Voting'
            )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
            onClick={() => handleStatusFilter('Voting')}
          >
            Voting
          </button>
          <button
            className={`${selectedFilterCSS(
              'Closed'
            )} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
            onClick={() => handleStatusFilter('Closed')}
          >
            Closed
          </button>
        </div>
      )}
    </>
  )
}

export default ContestFilter
