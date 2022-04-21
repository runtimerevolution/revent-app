import { useMutation } from '@apollo/client'
import { Button, Text, TextInput, useMantineTheme } from '@mantine/core'
import { EDIT_PHOTO } from '../graphql/queries'

const EditSubmission = ({ id }) => {
  const [editContent] = useMutation(EDIT_PHOTO)

  const theme = useMantineTheme()
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const onSubmit = (e) => {
    e.preventDefault()
    editContent({
      variables: {
        content: e.target.editContent.value,
        // id: id,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        Edit Photo:
      </Text>
      <TextInput
        placeholder="Edit Photo"
        label="Edit"
        variant="filled"
        name="editContent"
      />
      <Button
        variant="light"
        radius="md"
        type="submit"
        style={{ marginTop: '10px' }}
      >
        Edit current content
      </Button>
    </form>
  )
}

export default EditSubmission
