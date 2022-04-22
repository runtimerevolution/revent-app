import { useQuery } from '@apollo/client'
import { Card, Group, Text, useMantineTheme } from '@mantine/core'
import { GET_CURRENT_PHOTOS_BY_ID } from '../graphql/queries'
import EditSubmission from './EditSubmission'
import SubmitCommentPhoto from './SubmitCommentPhoto'
import SubmitVotePhoto from './SubmitVotePhoto'

const PhotoCard = ({ photoData, userID }) => {
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const mantineCard = (photoData) => {
    return (
      <div style={{ width: 340, margin: 'auto' }}>
        <Card shadow="sm" p="lg">
          <Card.Section>{photoData.content}</Card.Section>

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text weight={500}>Titulo da foto</Text>
            <SubmitVotePhoto submissionID={photoData.id} userID={userID} />
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {photoData.description}
          </Text>
          <SubmitCommentPhoto submissionID={photoData.id} userID={userID} />

          <EditSubmission id={photoData.id} />
        </Card>
      </div>
    )
  }
  return <div>{mantineCard(photoData)}</div>
}

const CurrentPhotos = ({ contestID }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_PHOTOS_BY_ID, {
    variables: {
      id: contestID,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>

  return data.getSubmissionsByContestId.map((photoData) => (
    <PhotoCard
      key={photoData.id}
      photoData={photoData}
      userID={'791c77ea-426a-4d12-bf4f-611ba3e67b09'}
    /> // userID will in the future be aquired by getSubmissionsByContestId return params and used like photoData.userID
  ))
}

export default CurrentPhotos
