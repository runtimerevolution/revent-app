import React from 'react'

export default function ErrorMessage({ error }) {
  return (
    <>
      <p className='text-orange-500'>{error}</p>
    </>
  )
}
