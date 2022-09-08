import { getUser } from 'services/reventService.js'

export default function contest({ user }) {
  return (
    <div>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Date joined: {user.date_joined}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  let contestId = context.params.id
  let user
  try {
    user = await getUser(contestId)
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      user,
    },
  }
}
