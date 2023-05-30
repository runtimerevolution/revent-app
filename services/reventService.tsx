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
  } else if (method == POST) {
    const body = args[0]
    const response = await fetch(NEXT_PUBLIC_API_URL + endpoint, {
      method: POST,
      mode: 'cors',
      body,
    })
    return response.json()
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

export async function getCollectionList() {
  const collections = [
    {
      id: 1,
      name: 'Collection 1',
      user: 'User 1',
      pictures: [
        { id: 1, picture_path: '/images/collection.jpeg' },
        { id: 2, picture_path: '/images/collection.jpeg' },
        { id: 3, picture_path: '/images/collection.jpeg' },
      ],
    },
    {
      id: 2,
      name: 'Collection 2',
      user: 'User 2',
      pictures: [
        { id: 4, picture_path: '/images/collection.jpeg' },
        { id: 5, picture_path: '/images/collection.jpeg' },
        { id: 6, picture_path: '/images/collection.jpeg' },
      ],
    },
    {
      id: 3,
      name: 'Collection 3',
      user: 'User 3',
      pictures: [
        { id: 7, picture_path: '/images/collection.jpeg' },
        { id: 8, picture_path: '/images/collection.jpeg' },
        { id: 9, picture_path: '/images/collection.jpeg' },
      ],
    },
    {
      id: 4,
      name: 'Collection 4',
      user: 'User 4',
      pictures: [
        { id: 10, picture_path: '/images/collection.jpeg' },
        { id: 11, picture_path: '/images/collection.jpeg' },
        { id: 12, picture_path: '/images/collection.jpeg' },
      ],
    },
    {
      id: 5,
      name: 'Collection 5',
      user: 'User 5',
      pictures: [
        { id: 13, picture_path: '/images/collection.jpeg' },
        { id: 14, picture_path: '/images/collection.jpeg' },
        { id: 15, picture_path: '/images/collection.jpeg' },
      ],
    },
  ]
  return collections
  // return fetchEndpoint('collections/', GET)
}

export async function getContestList() {
  const contests = [
    {
      id: 1,
      name: 'Coding Challenge #1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 2,
      name: 'Coding Challenge #2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 3,
      name: 'Coding Challenge #3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 4,
      name: 'Coding Challenge #4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 5,
      name: 'Coding Challenge #5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 6,
      name: 'Coding Challenge #6',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 7,
      name: 'Coding Challenge #7',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 8,
      name: 'Coding Challenge #8',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 9,
      name: 'Coding Challenge #9',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 10,
      name: 'Coding Challenge #10',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 11,
      name: 'Design Contest #2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateStart: '2023-07-01T09:00:00Z',
      dateEnd: '2023-07-10T23:59:59Z',
      status: 'Voting',
    },
    {
      id: 12,
      name: 'Hackathon #1',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2023-08-01T09:00:00Z',
      dateEnd: '2023-08-03T23:59:59Z',
      status: 'Closed',
    },
    {
      id: 13,
      name: 'Coding Challenge #2',
      description: 'A coding challenge to test your skills',
      dateStart: '2023-09-01T09:00:00Z',
      dateEnd: '2023-09-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 14,
      name: 'Design Contest #2',
      description: 'A design contest to showcase your creativity',
      dateStart: '2023-10-01T09:00:00Z',
      dateEnd: '2023-10-10T23:59:59Z',
      status: 'Closed',
    },
    {
      id: 15,
      name: 'Hackathon #2',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2023-11-01T09:00:00Z',
      dateEnd: '2023-11-03T23:59:59Z',
      status: 'Open',
    },
    {
      id: 16,
      name: 'Coding Challenge #3',
      description: 'A coding challenge to test your skills',
      dateStart: '2024-01-01T09:00:00Z',
      dateEnd: '2024-01-05T23:59:59Z',
      status: 'Voting',
    },
    {
      id: 17,
      name: 'Design Contest #3',
      description: 'A design contest to showcase your creativity',
      dateStart: '2024-02-01T09:00:00Z',
      dateEnd: '2024-02-10T23:59:59Z',
      status: 'Open',
    },
    {
      id: 18,
      name: 'Hackathon #3',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2024-03-01T09:00:00Z',
      dateEnd: '2024-03-03T23:59:59Z',
      status: 'Closed',
    },
    {
      id: 19,
      name: 'Coding Challenge #4',
      description: 'A coding challenge to test your skills',
      dateStart: '2024-04-01T09:00:00Z',
      dateEnd: '2024-04-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 20,
      name: 'Coding Challenge #1',
      description: 'A coding challenge to test your skills',
      dateStart: '2023-06-01T09:00:00Z',
      dateEnd: '2023-06-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 21,
      name: 'Design Contest #1',
      description: 'A design contest to showcase your creativity',
      dateStart: '2023-07-01T09:00:00Z',
      dateEnd: '2023-07-10T23:59:59Z',
      status: 'Voting',
    },
    {
      id: 22,
      name: 'Hackathon #1',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2023-08-01T09:00:00Z',
      dateEnd: '2023-08-03T23:59:59Z',
      status: 'Closed',
    },
    {
      id: 23,
      name: 'Coding Challenge #2',
      description: 'A coding challenge to test your skills',
      dateStart: '2023-09-01T09:00:00Z',
      dateEnd: '2023-09-05T23:59:59Z',
      status: 'Open',
    },
    {
      id: 24,
      name: 'Design Contest #2',
      description: 'A design contest to showcase your creativity',
      dateStart: '2023-10-01T09:00:00Z',
      dateEnd: '2023-10-10T23:59:59Z',
      status: 'Closed',
    },
    {
      id: 25,
      name: 'Hackathon #2',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2023-11-01T09:00:00Z',
      dateEnd: '2023-11-03T23:59:59Z',
      status: 'Open',
    },
    {
      id: 26,
      name: 'Coding Challenge #3',
      description: 'A coding challenge to test your skills',
      dateStart: '2024-01-01T09:00:00Z',
      dateEnd: '2024-01-05T23:59:59Z',
      status: 'Voting',
    },
    {
      id: 27,
      name: 'Design Contest #3',
      description: 'A design contest to showcase your creativity',
      dateStart: '2024-02-01T09:00:00Z',
      dateEnd: '2024-02-10T23:59:59Z',
      status: 'Open',
    },
    {
      id: 28,
      name: 'Hackathon #3',
      description: 'A hackathon to develop innovative solutions',
      dateStart: '2024-03-01T09:00:00Z',
      dateEnd: '2024-03-03T23:59:59Z',
      status: 'Closed',
    },
  ]

  return contests
  //   return fetchEndpoint('contests/', GET)
}
