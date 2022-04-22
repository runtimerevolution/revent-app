import { useMutation } from '@apollo/client'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { VOTE_PHOTO } from '../graphql/queries'

const SubmitVotePhoto = ({ submissionID, userID }) => {
  const [submitVote] = useMutation(VOTE_PHOTO)
  const [value, setValue] = useState('1')

  const onSubmit = (e) => {
    e.preventDefault()
    submitVote({
      variables: {
        value: value,
        submissionID: submissionID,
        userID: userID,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Button variant="light" radius="md" type="submit">
        Vote in this photo
      </Button>
    </form>
  )
}

export default SubmitVotePhoto
