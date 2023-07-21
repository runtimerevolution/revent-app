import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { SEARCH_QUERY } from '../lib/graphql'

const SearchInput = ({ setSearchData, setIsSearch }) => {
  const [query, setQuery] = useState<string>('')

  const [searchTerm, setSearchTerm] = useState('')
  const [searchContests, { loading, data }] = useLazyQuery(SEARCH_QUERY)

  // const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value)
  // }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
    setSearchTerm(value)
    searchContests({ variables: { search: value } })
  }

  useEffect(() => {
    setSearchData(data?.contest_search)
  }, [data])

  useEffect(() => {
    if (query) {
      setIsSearch(true)
    } else if (!query) {
      setIsSearch(false)
    }
  }, [query])

  // console.log('data', data)

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
