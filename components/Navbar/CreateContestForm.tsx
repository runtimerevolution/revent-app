import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { DateInput } from '@mantine/dates'
import CustomFileInput from '../helpers/CustomFileInput'

interface CreateContestFormProps {
  setshowContestCreationModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateContestForm({
  setshowContestCreationModal,
}: CreateContestFormProps) {
  const [dateOptions, setdateOptions] = useState('')

  const allowedImageFormats = ['jpeg', 'png', 'jpg']
  const fileSchema = z.object({
    name: z.string(),
    size: z.number(),
    type: z.string().refine((value) => {
      const fileExtension = value.split('/').pop()
      return allowedImageFormats.includes(fileExtension)
    }, 'Invalid image format'),
  })

  const schema = z.object({
    cover_picture: fileSchema,
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must be less than 50 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be less than 200 characters')
      .optional(),
    prize: z
      .string()
      .min(2, 'Prize must be at least 2 characters')
      .max(100, 'Prize must be less than 100 characters')
      .optional(),
    uploadPhaseDate: z.date().optional(),
    votingPhaseDate: z.date().optional(),
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
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 rounded-lg'>
        <div
          ref={modalRef}
          className='w-2/3  bg-white text-gray-800 rounded-lg shadow-xl p-8 overflow-y-auto '
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
                    {errors.title && <div>{errors.title}</div>}
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
                    {errors.description && <div>{errors.description}</div>}
                  </div>
                  <div>
                    <label htmlFor='image'>Upload Image</label>
                    <br />
                    <CustomFileInput
                      label='Cover Picture'
                      name='cover_picture'
                      errors={errors}
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
                    {errors.prize && <div>{String(errors.prize)}</div>}
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

                  <div className=' flex items-center justify-center'>
                    <button
                      className='mt-2 text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
                      type='submit'
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
