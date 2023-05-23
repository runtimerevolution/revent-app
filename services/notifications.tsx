import { getNotificationsList } from './reventService'

export async function getServerSideProps() {
  let notifications = []

  try {
    notifications = await getNotificationsList()
  } catch (err) {
    console.log('Error', err)
  }

  return {
    props: {
      notifications,
    },
  }
}
