import { FormikErrors } from 'formik'
import React from 'react'

interface ErrorMessageProps {
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[]
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className='text-orange-500'>{error.toString()}</p>
}
