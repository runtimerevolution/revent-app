import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useMutation } from '@apollo/client'
import { ADD_PHOTO, GET_CONTEST_DETAIL } from '../../lib/graphql'
import { useRef } from 'react'
import { useEffect } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import ErrorMessage from '../ErrorMessage'

interface ContestSubmissionInput {
  contest: number
  picture: string
  submission_date?: string
  votes?: string[]
}

interface SubmissionFormProps {
  contestID: number
  setShowAddPhotoForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubmissionForm({
  contestID,
  setShowAddPhotoForm,
}: SubmissionFormProps) {
  const schema = z.object({
    picture: z.string(),
  })
  const modalRef = useRef(null)

  const handleModalClose = () => {
    setShowAddPhotoForm(false)
  }

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalClose()
    }
  }

  const [createContestSubmission] = useMutation(ADD_PHOTO, {
    refetchQueries: [
      {
        query: GET_CONTEST_DETAIL,
        variables: { filters: { id: contestID } },
      },
    ],
  })

  const initialValues = {
    picture: '',
  }

  const handleSubmit = async (values) => {
    const { picture } = values

    try {
      const contestSubmission: ContestSubmissionInput = {
        contest: contestID,
        picture,
      }

      const response = await createContestSubmission({
        variables: { contestSubmission },
      })
    } catch (error) {
      console.error(error)
    }
    setShowAddPhotoForm(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal)
    }
  }, [])

  return (
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
          {({ isSubmitting, errors }) => (
            <div className='flex items-center justify-center'>
              <Form>
                <div>
                  <label className='text-lg font-medium' htmlFor='picture'>
                    Picture Path:
                  </label>
                  <Field
                    className='border border-orange-500 focus:border-orange-700 px-4 py-2 rounded-lg w-full'
                    type='text'
                    // type='file'
                    id='picture'
                    name='picture'
                  />
                  {errors.picture && <ErrorMessage error={errors.picture} />}
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    className='mt-2 text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Submit Contest Submission
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}
