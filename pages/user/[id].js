import Layout from "../../services/Layout.js";
import { getUser } from "../../services/utils.js";

const DECODE_PREFIX = "data:image/png;base64,";

export default function contest({ user }) {
  return (
    <Layout>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Date joined: {user.date_joined}</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let contestId = context.params.id;
  let user;
  try {
    user = await getUser(contestId);
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      user,
    },
  };
}
