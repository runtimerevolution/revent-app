import { useQuery } from '@apollo/client'
import { Card, Group, Text, useMantineTheme } from '@mantine/core'
import { GET_CURRENT_PHOTOS } from '../graphql/queries'
import SubmitCommentPhoto from './SubmitCommentPhoto'
import SubmitVotePhoto from './SubmitVotePhoto'

const PhotoCard = ({ photoData }) => {
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  const mantineCard = (photoData) => {
    return (
      <div style={{ width: 340, margin: 'auto' }}>
        <Card shadow="sm" p="lg">
          <Card.Section>
            {/* <Image src="./image.png" height={160} alt="Norway" /> */}
            {photoData.content}
          </Card.Section>

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text weight={500}>Titulo da foto</Text>
            <SubmitVotePhoto id={photoData.id} />
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {photoData.description}
          </Text>
          <SubmitCommentPhoto id={photoData.id} />
        </Card>
      </div>
    )
  }
  // Here, i already have access to all the data (description...) associated with the photo
  return <div>{mantineCard(photoData)}</div>
}

const CurrentPhotos = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_PHOTOS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong {error.message}</p>
  console.log('Photos', data)

  // Substituir queryName depois quando souber
  return data.submissions.map((photoData) => (
    <PhotoCard key={data.photoData.id} photoData={photoData} />
  ))
}

export default CurrentPhotos
