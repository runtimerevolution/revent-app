import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { z } from 'zod'

export default function CreateContestForm() {
  const initialValues = {
    name: '',
    email: '',
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
  }
  return (
    <div className='w-48 absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto'>
      <Formik
        initialValues={initialValues}
        // validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name' />
            {/* <ErrorMessage name='name' component='div' /> */}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email' />
            {/* <ErrorMessage name='email' component='div' /> */}
          </div>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
