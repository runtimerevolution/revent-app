import { useState } from 'react'

const SearchInput = () => {
  const [query, setQuery] = useState('')

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  return (
    <>
      <input
        type='text'
        placeholder='Search'
        className='w-24 sm:w-32 py-1 px-3 text-sm text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600'
        value={query}
        onChange={handleQueryChange}
      />
    </>
  )
}

export default SearchInput
