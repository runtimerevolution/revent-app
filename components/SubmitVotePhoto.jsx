import { useMutation } from '@apollo/client'
import { Badge } from '@mantine/core'
import { useState } from 'react'
import { VOTE_PHOTO } from '../graphql/queries'

const SubmitVotePhoto = ({ id }) => {
  const [submitVote] = useMutation(VOTE_PHOTO)
  const [value, setValue] = useState('1')

  const onSubmit = (e) => {
    e.preventDefault()
    submitVote({
      variables: {
        value: value,
        // id: id,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Badge color="pink" variant="light">
        Vote in this photo
      </Badge>
    </form>
  )
}

export default SubmitVotePhoto
