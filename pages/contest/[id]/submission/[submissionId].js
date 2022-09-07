export default function submission({ newID, newID2 }) {
  return (
    <div>
      <p>{newID}</p>
      <p>{newID2}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      newID: context.params.id,
      newID2: context.params.submissionId,
    },
  };
}
