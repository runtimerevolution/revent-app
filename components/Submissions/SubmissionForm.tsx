import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMutation } from '@apollo/client'
import { ADD_PHOTO } from '../../lib/graphql'

interface ContestSubmissionInput {
  contest: number
  picture: string
  submission_date: string
  votes?: string[]
}

export default function SubmissionForm() {
  const [createContestSubmission] = useMutation(ADD_PHOTO)

  const handleSubmit = async (values) => {
    const { contest, picture, submission_date } = values

    try {
      const contestSubmission: ContestSubmissionInput = {
        contest: parseInt(contest),
        picture,
        submission_date,
        // votes,
      }

      const response = await createContestSubmission({
        variables: { contestSubmission },
      })
      console.log(response.data.create_contestSubmission)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={{
        contest: '',
        picture: '',
        submission_date: '',
        votes: [],
      }}
      // validate={(values) => {
      //   const errors = {}
      //   console.log('errors', errors)
      //   return errors
      // }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor='contest'>Contest ID:</label>
            <Field type='number' id='contest' name='contest' />
          </div>

          <div>
            <label htmlFor='picture'>Picture Path:</label>
            <Field type='text' id='picture' name='picture' />
          </div>

          <div>
            <label htmlFor='submission_date'>Submission Date:</label>
            <Field type='date' id='submission_date' name='submission_date' />
          </div>

          <button type='submit' disabled={isSubmitting}>
            Submit Contest Submission
          </button>
        </Form>
      )}
    </Formik>
  )
}
