import { useMutation } from '@apollo/client'
import { Button, Textarea, TextInput } from '@mantine/core'
import { ADD_PHOTO } from '../graphql/queries'

const SubmitPhoto = ({ idContest, idUser }) => {
  const [addPhoto] = useMutation(ADD_PHOTO, {
    onCompleted: (data) => {
      window.location.reload()
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    addPhoto({
      variables: {
        description: e.target.text.value,
        content: e.target.content.value,
        userID: idUser,
        contestID: idContest,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        placeholder="Photo"
        label="Photo"
        variant="filled"
        required
        name="content"
      />
      <Textarea
        placeholder="Description"
        label="Description"
        variant="filled"
        name="text"
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

export default SubmitPhoto
