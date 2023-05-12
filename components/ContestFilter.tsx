import React from 'react'
import { IFilter } from './helpers/interfaces'
import SearchInput from './SearchInput'

function ContestFilter(props) {
  const { open, setOpen, statusFilter, setStatusFilter } = props

  const handleStatusFilter = (status: IFilter) => {
    console.log('status', status)
    setStatusFilter({ status: status.status })
  }

  const selectedFilterCSS = (filter: IFilter) => {
    if (filter.status === statusFilter.status) {
      return 'text-orange-500 bg-orange-700'
    }
    return 'text-gray-700 bg-gray-700'
  }

  const filterList: IFilter[] = [
    { status: 'Open' },
    { status: 'All' },
    { status: 'Voting' },
    { status: 'Closed' },
  ]

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
          {filterList.map((filter) => (
            <button
              key={filter.status}
              className={`${selectedFilterCSS({
                status: filter.status,
              })} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
              onClick={() => handleStatusFilter({ status: filter.status })}
            >
              {filter.status}
            </button>
          ))}
        </>
        // <div>
        //   <button
        //     className={`${selectedFilterCSS({
        //       status: 'Open',
        //     })} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
        //     onClick={() =>
        //       handleStatusFilter({
        //         status: 'Open',
        //       })
        //     }
        //   >
        //     Open
        //   </button>
        //   <button
        // className={`${selectedFilterCSS({
        //   status: 'All',
        // })} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
        //     onClick={() =>
        //       handleStatusFilter({
        //         status: 'All',
        //       })
        //     }
        //   >
        //     All
        //   </button>

        //   <button
        //     className={`${selectedFilterCSS({
        //       status: 'Voting',
        //     })} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
        //     onClick={() =>
        //       handleStatusFilter({
        //         status: 'Voting',
        //       })
        //     }
        //   >
        //     Voting
        //   </button>
        //   <button
        //     className={`${selectedFilterCSS({
        //       status: 'Closed',
        //     })} text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2 mt-2`}
        //     onClick={() =>
        //       handleStatusFilter({
        //         status: 'Closed',
        //       })
        //     }
        //   >
        //     Closed
        //   </button>
        // </div>
      )}
    </>
  )
}

export default ContestFilter
