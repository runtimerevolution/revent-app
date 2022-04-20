import { useMutation } from '@apollo/client'
import { Button, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import moment from 'moment'
import { useState } from 'react'
import { ADD_CONTEST } from '../graphql/queries'

const SubmitContest = () => {
  const [addContest] = useMutation(ADD_CONTEST, {
    onCompleted: (data) => {
      window.location.reload()
    },
  })

  const [dateStart, setDateStart] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())

  const parseDateForBackend = (date) => moment(date).format('Y-m-d H:M:S')

  const onSubmit = (e) => {
    let newDateStart = parseDateForBackend(dateStart)
    let newDateEnd = parseDateForBackend(dateEnd)
    e.preventDefault()
    console.log(
      'description',
      e.target.description.value,
      e.target.name.value,
      newDateStart,
      newDateEnd,
    )
    // addContest({ variables: { dateStart: newDateStart, dateEnd: newDateEnd, name: e.target.name.value, description: e.target.description.value } })
  }

  return (
    <form onSubmit={onSubmit}>
      <DatePicker
        placeholder="Pick start date"
        label="Event start date"
        required
        value={dateStart}
        onChange={setDateStart}
      />
      <DatePicker
        placeholder="Pick end date"
        label="Event end date"
        required
        value={dateEnd}
        onChange={setDateEnd}
      />
      <TextInput
        placeholder="Event Title"
        label="Title"
        variant="filled"
        required
        name="name"
      />
      <Textarea
        placeholder="Description"
        label="Description"
        variant="filled"
        name="description"
      />
      <Button
        variant="light"
        radius="md"
        type="submit"
        style={{ marginTop: '10px' }}
      >
        Submit
      </Button>
    </form>
  )
}

export default SubmitContest
