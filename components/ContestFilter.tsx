import React from 'react'
import Image from 'next/image'

import styles from './ContestFilter.module.css'
import { Filter } from 'types'

enum FilterToString {
  all = `All Contests`,
  open = 'Open',
  voting = 'Voting',
  closed = 'Closed',
}

interface ContestFilterProps {
  statusFilter: Filter
  setStatusFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export default function ContestFilter({
  statusFilter,
  setStatusFilter,
}: ContestFilterProps) {
  return (
    <>
      <div id='Header' className='flex justify-between'>
        <div id='Title'>
          <span className='text-[24px] text-[#444444] font-bold'>Photo </span>
          <span className='text-[24px] text-[#F78445] font-bold'>Contests</span>
        </div>
        <div id='ActionsMenu'>
          <div
            id='SearchButton'
            className='rounded-full bg-[#F3F3F4] w-11 h-11 flex justify-center '
          >
            <Image
              src='/images/search.svg'
              alt='Search icon'
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      <div
        id='Filters'
        className={`${styles.filters} flex gap-2 overflow-x-scroll mt-6`}
      >
        {Object.entries(FilterToString).map(([filter, filterString], key) => (
          <button
            key={key}
            className={`${
              filter === statusFilter
                ? 'bg-[#444444] text-[#FFFFFF]'
                : 'bg-[#F3F3F4] text-[#777777]'
            }  px-5 py-2 rounded-full font-normal whitespace-nowrap`}
            onClick={() => {
              setStatusFilter(filter as Filter)
            }}
            type='button'
          >
            {filterString}
          </button>
        ))}
      </div>
    </>
  )
}
