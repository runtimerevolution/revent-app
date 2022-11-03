import BlurImage from 'components/BlurImage'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { imageToUrl } from 'services/imageDecoderService.js'
import {
  getSubmissionsFromContest,
  getUserList,
  postSubmission,
} from 'services/reventService.js'

export default function Contest({ contestId, submissions, userList }) {
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const [submissionDescription, setSubmissionDescription] = useState('')

  // Uploads photo to show before submitting to server
  function loadImage(event) {
    if (event.target.files && event.target.files[0]) {
      imageToUrl(event.target.files[0], (result) => setCreateObjectURL(result))
    }
  }

  function changeDescription(event) {
    setSubmissionDescription(event.target.value)
  }

  async function uploadToServer() {
    const body = new FormData()
    // TODO add when auth is done
    body.append('user', '5d2ee9f3-7f36-4861-ad59-4297aa96f932')
    body.append('contest', contestId)
    body.append('url', createObjectURL)
    body.append('description', submissionDescription)
    postSubmission(body).then(() => Router.reload(window.location.pathname))
  }

  if (
    !submissions ||
    submissions.detail == 'Not found.' ||
    submissions[0]?.detail == 'Not found.'
  )
    return <h2>This Contests Was Not Found!</h2>

  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {submissions?.map(({ id, user, url, description }) => (
          <div className='w-96 h-96 relative' key={id}>
            <BlurImage
              key={id}
              contestId={contestId}
              submissionId={id}
              user={getUserName(user, userList)}
              url={url}
              description={description}
            />
          </div>
        ))}
      </div>
      <div>
        <h4>Select Image</h4>
        <input type='file' name='myImage' onChange={loadImage} />

        {createObjectURL && (
          <div>
            <p>Description:</p>
            <input
              type='text'
              name='description'
              className='w-96 border-2 border-b-black'
              onChange={changeDescription}
            />
            <img className='w-96 h-96' src={createObjectURL} />
            <button
              className='btn btn-primary w-96 border-2 border-black'
              type='submit'
              onClick={() => uploadToServer({ id: 'ID' })}
            >
              Send to server
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let contestId = context.params.id
  let submissions = null
  let userList = null
  try {
    submissions = await getSubmissionsFromContest(contestId)
    userList = await getUserList()
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      contestId,
      submissions,
      userList,
    },
  }
}

function getUserName(userUUID, userList) {
  const result = userList.find((user) => user.id === userUUID)
  if (!result) return 'Name not found!'
  return result.first_name + ' ' + result.last_name
}

Contest.propTypes = {
  contestId: PropTypes.string,
  submissions: PropTypes.array,
  userList: PropTypes.array,
}
