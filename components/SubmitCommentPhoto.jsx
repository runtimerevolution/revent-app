import { useMutation } from '@apollo/client'
import { Button, Textarea } from '@mantine/core'
import { COMMENT_PHOTO } from '../graphql/queries'

const SubmitCommentPhoto = ({ submissionID, userID }) => {
  const [submitComment] = useMutation(COMMENT_PHOTO)

  const onSubmit = (e) => {
    e.preventDefault()
    submitComment({
      variables: {
        text: e.target.comment.value,
        submissionID: submissionID,
        userID: userID,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        placeholder="Comment"
        label="Comment this photo"
        variant="filled"
        name="comment"
      />
      <Button
        variant="light"
        radius="md"
        type="submit"
        style={{ marginTop: '10px' }}
      >
        Submit comment
      </Button>
    </form>
  )
}

export default SubmitCommentPhoto
