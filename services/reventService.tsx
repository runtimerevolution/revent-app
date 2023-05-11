const { NEXT_PUBLIC_API_URL } = process.env
const GET = 'GET'
const POST = 'POST'

export async function fetchEndpoint(endpoint, method, ...args) {
  if (method == GET) {
    const response = await fetch(NEXT_PUBLIC_API_URL + endpoint, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } else if (method == POST) {
    const body = args[0]
    const response = await fetch(NEXT_PUBLIC_API_URL + endpoint, {
      method: POST,
      mode: 'cors',
      body,
    })
    const data = await response.json()
    return data
  }
}

export async function getSubmissionList() {
  return fetchEndpoint('submissions/', GET)
}

export async function postSubmission(body) {
  return fetchEndpoint('submissions/', POST, body)
}

export async function getUserList() {
  return fetchEndpoint('users/', GET)
}

export async function getUser(id) {
  return fetchEndpoint('users/' + id, GET)
}

export async function getSubmissionsFromContest(id) {
  return fetchEndpoint('contests/' + id, GET)
}

export async function getContestList() {
  const contests = [
    {
      name: 'Coding Challenge #1',
      description: 'A coding challenge to test your skills',
      date_start: '2023-06-01T09:00:00Z',
      date_end: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      name: 'Design Contest #1',
      description: 'A design contest to showcase your creativity',
      date_start: '2023-07-01T09:00:00Z',
      date_end: '2023-07-10T23:59:59Z',
      status: 'Voting',
    },
    {
      name: 'Hackathon #1',
      description: 'A hackathon to develop innovative solutions',
      date_start: '2023-08-01T09:00:00Z',
      date_end: '2023-08-03T23:59:59Z',
      status: 'Closed',
    },
    {
      name: 'Coding Challenge #2',
      description: 'A coding challenge to test your skills',
      date_start: '2023-09-01T09:00:00Z',
      date_end: '2023-09-05T23:59:59Z',
      status: 'Open',
    },
    {
      name: 'Design Contest #2',
      description: 'A design contest to showcase your creativity',
      date_start: '2023-10-01T09:00:00Z',
      date_end: '2023-10-10T23:59:59Z',
      status: 'Closed',
    },
    {
      name: 'Hackathon #2',
      description: 'A hackathon to develop innovative solutions',
      date_start: '2023-11-01T09:00:00Z',
      date_end: '2023-11-03T23:59:59Z',
      status: 'Open',
    },
    {
      name: 'Coding Challenge #3',
      description: 'A coding challenge to test your skills',
      date_start: '2024-01-01T09:00:00Z',
      date_end: '2024-01-05T23:59:59Z',
      status: 'Voting',
    },
    {
      name: 'Design Contest #3',
      description: 'A design contest to showcase your creativity',
      date_start: '2024-02-01T09:00:00Z',
      date_end: '2024-02-10T23:59:59Z',
      status: 'Open',
    },
    {
      name: 'Hackathon #3',
      description: 'A hackathon to develop innovative solutions',
      date_start: '2024-03-01T09:00:00Z',
      date_end: '2024-03-03T23:59:59Z',
      status: 'Closed',
    },
    {
      name: 'Coding Challenge #4',
      description: 'A coding challenge to test your skills',
      date_start: '2024-04-01T09:00:00Z',
      date_end: '2024-04-05T23:59:59Z',
      status: 'Open',
    },
  ]

  return contests

  //   return fetchEndpoint('contests/', GET)
}
