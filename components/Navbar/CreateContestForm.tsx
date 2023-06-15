import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { useState, useEffect } from 'react'

import { DateInput } from '@mantine/dates'
import { useRef } from 'react'

interface CreateContestFormProps {
  setshowContestCreationModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateContestForm({
  setshowContestCreationModal,
}: CreateContestFormProps) {
  const [dateOptions, setdateOptions] = useState('')

  const schema = z.object({
    cover_picture: z.string().refine((value) => {
      // Check if value is a valid image file
      if (!value) return false // If value is empty, consider it invalid
      const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif'] // Define accepted image formats
      return acceptedFormats.includes(value) // Check if value's type matches the accepted formats
    }, 'Invalid image format'),
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must be less than 50 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be less than 200 characters'),
    prize: z
      .string()
      .min(2, 'Prize must be at least 2 characters')
      .max(100, 'Prize must be less than 100 characters'),
    uploadPhaseDate: z.date(),
    votingPhaseDate: z.date(),
  })
  const initialValues = {
    title: '',
    description: '',
    cover_picture: null,
    prize: '',
    datesOption: dateOptions,
    uploadPhaseDate: null,
    votingPhaseDate: null,
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
    setshowContestCreationModal(false)
  }

  const modalRef = useRef(null)

  const handleModalClose = () => {
    setshowContestCreationModal(false)
  }

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal)
    }
  }, [])
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50'>
        <div
          ref={modalRef}
          className='w-2/3  bg-white text-gray-800 rounded-lg shadow-xl p-8 max-h-80 overflow-y-auto '
        >
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors }) => (
              <div className='flex items-center justify-center'>
                <Form>
                  <div>
                    <label htmlFor='title'>Title</label>
                    <br />
                    <Field
                      type='text'
                      id='title'
                      name='title'
                      className='border border-black-500'
                    />
                    <ErrorMessage
                      name='title'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div>
                    <label htmlFor='description'>Description</label>
                    <br />
                    <Field
                      as='textarea'
                      type='text'
                      id='description'
                      name='description'
                      className='border border-black-500'
                      rows={2}
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div>
                    <label htmlFor='image'>Upload Image</label>
                    <br />
                    <Field
                      as='input'
                      id='image'
                      name='image'
                      type='file'
                      className='border border-black-500'
                      onChange={(event) => {
                        const file = event.target.files[0]
                        setFieldValue('cover_picture', file)
                        // setCoverPicture(file)
                      }}
                    />
                    <ErrorMessage
                      name='cover_picture'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className=''>
                    <label htmlFor='prize'>Prize</label>
                    <br />
                    <Field
                      type='text'
                      id='prize'
                      name='prize'
                      className='border border-black-500'
                    />
                    <ErrorMessage
                      name='prize'
                      component='div'
                      className='error'
                    />
                  </div>

                  <div>
                    <label>Choose Dates Option:</label>
                    <div>
                      <label>
                        <br />
                        <Field
                          type='radio'
                          name='datesOption'
                          checked={dateOptions === 'manual'}
                          onChange={() => {
                            setdateOptions('manual')
                          }}
                        />
                        Manual Dates
                      </label>
                      <label>
                        <br />
                        <Field
                          type='radio'
                          name='datesOption'
                          checked={dateOptions === 'automated'}
                          onChange={() => {
                            setdateOptions('automated')
                          }}
                        />
                        Automated Dates
                      </label>
                    </div>
                  </div>

                  {dateOptions === 'automated' && (
                    <>
                      <div>
                        <label htmlFor='uploadPhase'>Upload Phase</label>
                        <DateInput
                          id='uploadPhaseDate'
                          onChange={(date) => {
                            setFieldValue('uploadPhaseDate', date)
                          }}
                          label='Date input'
                          placeholder='Date input'
                          maw={400}
                          mx='auto'
                        />
                      </div>
                      <div>
                        <label htmlFor='votingPhase'>Voting Phase</label>
                        <DateInput
                          id='votingPhaseDate'
                          onChange={(date) => {
                            setFieldValue('votingPhaseDate', date)
                          }}
                          label='Date input'
                          placeholder='Date input'
                          maw={400}
                          mx='auto'
                        />
                      </div>
                    </>
                  )}

                  <button
                    className='mt-2 text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
                    type='submit'
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
