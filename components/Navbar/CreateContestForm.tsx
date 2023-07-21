import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { DateInput } from '@mantine/dates'
import ErrorMessage from '../ErrorMessage'
import { useMutation } from '@apollo/client'
import { CREATE_CONTEST, CREATE_PICTURE } from '../../lib/graphql'

interface CreateContestFormProps {
  setshowContestCreationModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ContestInput {
  title: string
  description: string
  cover_picture: number
  prize: string
  automated_dates?: boolean
  upload_phase_start?: string
  upload_phase_end?: string
  voting_phase_end?: string
  winners?: string[]
  created_by: string
}

export default function CreateContestForm({
  setshowContestCreationModal,
}: CreateContestFormProps) {
  const [createContest] = useMutation(CREATE_CONTEST)
  const [createPicture] = useMutation(CREATE_PICTURE)
  const [dateOptions, setdateOptions] = useState('')
  const [uploadDate, setuUploadDate] = useState<Date | null>(null)
  const [votingDate, setVotingDate] = useState<Date | null>(null)

  const [automatedDates, setAutomatedDates] = useState<boolean>(false)

  const allowedImageFormats = ['jpeg', 'png', 'jpg']
  // To be used when the upload picture feature is done
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
    // To be used when the upload picture feature is done
    // cover_picture: fileSchema,
    cover_picture: z.string(),
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must be less than 50 characters'),
    description: z
      .string()
      .max(200, 'Description must be less than 200 characters'),
    prize: z
      .string()
      .max(100, 'Prize must be less than 100 characters')
      .optional(),
    upload_phase_date: z.date().optional().nullable(),
    voting_phase_date: z.date().optional().nullable(),
  })

  const initialValues = {
    title: '',
    description: '',
    cover_picture: null,
    prize: '',
    datesOption: '',
    upload_phase_end: uploadDate,
    voting_phase_end: votingDate,
    automated_dates: automatedDates,
  }

  const handleSubmit = async (contestValues) => {
    const {
      title,
      description,
      cover_picture,
      prize,
      upload_phase_start,
      upload_phase_end,
      voting_phase_end,
      automated_dates,
    } = contestValues

    try {
      const picture = {
        user: 'test@test.com',
        picture_path: cover_picture,
      }

      const createdPicture = await createPicture({
        variables: { picture },
      })

      if (createdPicture.data.create_picture.id) {
        const contest: ContestInput = {
          title,
          description,
          cover_picture: createdPicture.data.create_picture.id,
          prize,
          upload_phase_start,
          upload_phase_end,
          voting_phase_end,
          automated_dates,
          // To be replaced when authentication exists
          created_by: 'test@test.com',
        }

        await createContest({
          variables: { contest },
        })
      }
    } catch (error) {
      console.error(error)
    }
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
    setAutomatedDates(automatedDates)
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
                    {/* To be used when the upload picture feature is done */}
                    {/* <CustomFileInput
                      label=''
                      name='cover_picture'
                      errors={errors}
                    /> */}
                    <Field
                      className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-lg w-full'
                      type='text'
                      // type='file'
                      id='cover_picture'
                      name='cover_picture'
                    />
                  </div>
                  {errors.cover_picture && (
                    <ErrorMessage error={errors.cover_picture} />
                  )}
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
                            setAutomatedDates(false)
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
                            setAutomatedDates(true)
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
                          id='upload_phase_end'
                          onChange={(date) => {
                            setuUploadDate(date)
                            setFieldValue('upload_phase_end', date)
                          }}
                          maw={400}
                          mx='auto'
                          className='mt-2'
                        />
                      </div>
                      <div className='mt-2'>
                        <label htmlFor='votingPhase'>Voting Phase</label>
                        <DateInput
                          id='voting_phase_end'
                          onChange={(date) => {
                            setVotingDate(date)
                            setFieldValue('voting_phase_end', date)
                          }}
                          maw={400}
                          mx='auto'
                          className='mt-2'
                        />
                      </div>
                    </>
                  )}

                  <div className='flex items-center justify-center'>
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
