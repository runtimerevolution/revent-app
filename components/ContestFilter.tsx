import React, { useEffect } from 'react'

export default function ContestFilter(props) {
  const { open, statusFilter, setStatusFilter } = props

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
    <>
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
    </>
  )
}
