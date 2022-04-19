import { useMutation } from '@apollo/client';
import { Button, Textarea } from '@mantine/core';
import { ADD_PHOTO } from '../graphql/queries';

const SubmitPhoto = () => {
  const [addPhoto] = useMutation(ADD_PHOTO, {
    onCompleted: (data) => {
      window.location.reload()
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('description', e.target.text.value)
    // addPhoto({ variables: { description: e.target.text.value } })
  }

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        placeholder="Description"
        label="Description"
        variant="filled"
        name="text"
      />
      <Button variant="light" radius="md" type='submit' style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </form>
  )
}

export default SubmitPhoto
