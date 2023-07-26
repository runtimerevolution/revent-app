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
    searchContests({ variables: { search: value } })
  }

  useEffect(() => {
    setSearchData(data?.contest_search)
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
      className='w-24 sm:w-32 py-1 px-3 text-sm text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600'
      value={query}
      onChange={handleQueryChange}
    />
  )
}

export default SearchInput
