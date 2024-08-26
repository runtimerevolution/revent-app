import { getNotificationsList } from './reventService'

export async function getServerSideProps() {
  let notifications = []

  try {
    notifications = await getNotificationsList()
  } catch (err) {
    console.error('Error', err)
  }

  return {
    props: {
      notifications,
    },
  }
}
