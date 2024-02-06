import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { SEARCH_QUERY } from '../lib/graphql'

const SearchInput = ({ setSearchData, setIsSearching }) => {
  const [query, setQuery] = useState<string>('')
  const [searchContests, { data }] = useLazyQuery(SEARCH_QUERY)

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
    searchContests({ variables: { filters: { search: value } } })
  }
  useEffect(() => {
    setSearchData(data?.contests)
  }, [data])

  useEffect(() => {
    if (query) {
      setIsSearching(true)
    } else if (!query) {
      setIsSearching(false)
    }
  }, [query])

  return (
    <input
      type='text'
      placeholder='Search'
      className='w-full py-2 px-3 text-sm text-gray-700 rounded-full focus:outline-none focus:ring-2 col-span-5'
      value={query}
      onChange={handleQueryChange}
    />
  )
}

export default SearchInput
