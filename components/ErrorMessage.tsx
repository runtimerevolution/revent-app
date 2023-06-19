import React from 'react'

interface ErrorMessageProps {
  error: string
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <>
      <p className='text-orange-500'>{error}</p>
    </>
  )
}
