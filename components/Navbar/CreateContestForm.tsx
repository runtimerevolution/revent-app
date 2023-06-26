import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { DateInput } from '@mantine/dates'
import CustomFileInput from '../helpers/CustomFileInput'
import ErrorMessage from '../ErrorMessage'

interface CreateContestFormProps {
  setshowContestCreationModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateContestForm({
  setshowContestCreationModal,
}: CreateContestFormProps) {
  const [dateOptions, setdateOptions] = useState('')
  const [uploadDate, setuUploadDate] = useState<Date | null>(null)
  const [votingDate, setVotingDate] = useState<Date | null>(null)

  const allowedImageFormats = ['jpeg', 'png', 'jpg']
  const fileSchema = z
    .object({
      name: z.string(),
      size: z.number(),
      type: z.string().refine((value) => {
        const fileExtension = value.split('/').pop()
        return allowedImageFormats.includes(fileExtension)
      }, 'Invalid image format'),
    })
    .nullable()
    .refine((value) => value !== null, { message: 'File is required' })

  const schema = z.object({
    cover_picture: fileSchema,
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must be less than 50 characters'),
    description: z
      .string()
      .max(200, 'Description must be less than 200 characters')
      .optional(),
    prize: z
      .string()
      .max(100, 'Prize must be less than 100 characters')
      .optional(),
    uploadPhaseDate: z.date().optional().nullable(),
    votingPhaseDate: z.date().optional().nullable(),
  })

  const initialValues = {
    title: '',
    description: '',
    cover_picture: null,
    prize: '',
    datesOption: '',
    uploadPhaseDate: uploadDate,
    votingPhaseDate: votingDate,
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

  useEffect(() => {
    setVotingDate(null)
    setuUploadDate(null)
  }, [dateOptions])

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 rounded-lg'>
        <div
          ref={modalRef}
          className='w-2/3 max-h-screen bg-white text-gray-800 rounded-lg shadow-xl p-8 overflow-y-auto '
        >
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors }) => (
              <div className='flex items-center justify-center'>
                <Form>
                  <a className='font-bold text-xl mb-2'>
                    New <a className='text-orange-500'> Contest</a>
                  </a>
                  <div className='mt-2'>
                    <label className='text-lg font-medium' htmlFor='title'>
                      Title
                    </label>
                    <br />
                    <Field
                      type='text'
                      id='title'
                      name='title'
                      className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-lg w-full'
                    />
                    {errors.title && <ErrorMessage error={errors.title} />}
                  </div>
                  <div className='mt-2'>
                    <label
                      className='text-lg font-medium'
                      htmlFor='description'
                    >
                      Description
                    </label>
                    <br />
                    <Field
                      as='textarea'
                      type='text'
                      id='description'
                      name='description'
                      className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-md resize-none w-full'
                      rows={6}
                    />

                    {errors.description && (
                      <ErrorMessage error={errors.description} />
                    )}
                  </div>
                  <div className='mt-2'>
                    <label className='text-lg font-medium' htmlFor='image'>
                      Upload Image
                    </label>
                    <br />
                    <CustomFileInput
                      label=''
                      name='cover_picture'
                      errors={errors}
                    />
                  </div>
                  <div className='mt-2'>
                    <label className='text-lg font-medium' htmlFor='prize'>
                      Prize
                    </label>
                    <br />
                    <Field
                      type='text'
                      id='prize'
                      name='prize'
                      className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-md w-full'
                    />

                    {errors.prize && <ErrorMessage error={errors.prize} />}
                  </div>

                  <div className='mt-2'>
                    <label className='text-lg font-medium'>
                      Choose Dates Option:
                    </label>
                    <div>
                      <label>
                        <br />
                        <Field
                          type='radio'
                          name='datesOption'
                          className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-md'
                          checked={dateOptions === 'manual'}
                          onChange={() => {
                            setdateOptions('manual')
                            setFieldValue('dateOptions', 'manual')
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
                            setFieldValue('dateOptions', 'automated')
                          }}
                        />
                        Automated Dates
                      </label>
                    </div>
                  </div>

                  {dateOptions === 'automated' && (
                    <>
                      <div className='mt-2'>
                        <label htmlFor='uploadPhase'>Upload Phase</label>
                        <DateInput
                          id='uploadPhaseDate'
                          onChange={(date) => {
                            setuUploadDate(date)
                            setFieldValue('uploadPhaseDate', date)
                          }}
                          maw={400}
                          mx='auto'
                          className='mt-2'
                        />
                      </div>
                      <div className='mt-2'>
                        <label htmlFor='votingPhase'>Voting Phase</label>
                        <DateInput
                          id='votingPhaseDate'
                          onChange={(date) => {
                            setVotingDate(date)
                            setFieldValue('votingPhaseDate', date)
                          }}
                          maw={400}
                          mx='auto'
                          className='mt-2'
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
