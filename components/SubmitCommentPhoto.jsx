import { Button, Textarea } from '@mantine/core'
import COMMENT_PHOTO from '../graphql/queries'

const SubmitCommentPhoto = ({ id }) => {
  const [submitComment] = useMutation(COMMENT_PHOTO)

  const onSubmit = (e) => {
    e.preventDefault()
    submitComment({
      variables: {
        comment: e.target.comment.value,
        // id: id,
      },
    })
  }

  return (
    <form>
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
