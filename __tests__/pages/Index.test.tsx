import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'

import Home from '../../pages'
import { GET_CONTEST_LIST, SEARCH_QUERY } from '../../lib/graphql'

const mockData = {
  contests: [
    {
      __typename: 'ContestType',
      id: 1,
      title: 'Contest1',
      description: 'Description',
      prize: '50',
      upload_phase_end: null,
      upload_phase_start: '2023-07-17T10:03:16.573878+00:00',
      voting_phase_end: null,
      cover_picture: {
        __typename: 'PictureType',
        file: 'https://picsum.photos/536/354',
      },
      status: 'open',
    },
    {
      __typename: 'ContestType',
      id: 2,
      title: 'Contest2',
      description: 'Description',
      prize: '50',
      upload_phase_end: null,
      upload_phase_start: '2023-07-17T10:03:28.384159+00:00',
      voting_phase_end: null,
      cover_picture: {
        __typename: 'PictureType',
        file: 'https://picsum.photos/seed/picsum/200/300',
      },
      status: 'open',
    },
    {
      __typename: 'ContestType',
      id: 3,
      title: 'Contest3',
      description: 'Description',
      prize: '50',
      upload_phase_end: null,
      upload_phase_start: '2023-07-17T10:03:30.651620+00:00',
      voting_phase_end: null,
      cover_picture: {
        __typename: 'PictureType',
        file: 'https://www.jquery-az.com/html/images/banana.jpg',
      },
      status: 'open',
    },
  ],
}

const mocks = [
  {
    request: {
      query: GET_CONTEST_LIST,
    },
    result: {
      error: false,
      loading: false,
      data: mockData,
    },
  },
]

const searchMock = {
  request: {
    query: SEARCH_QUERY,
    variables: { filters: { search: 'Contest1' } },
  },
  result: {
    data: { contests: [mockData.contests[0]] },
  },
}

test('renders contest list', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  )

  const expectedText = 'Contest1'
  await waitFor(() => expect(screen.getByText(expectedText)).toBeInTheDocument)
  const expectedText2 = 'Contest2'
  await waitFor(() => expect(screen.getByText(expectedText2)).toBeInTheDocument)
})

test('displays filtered contests based on search input', async () => {
  render(
    <MockedProvider mocks={[...mocks, searchMock]} addTypename={false}>
      <Home />
    </MockedProvider>
  )

  const searchInput = screen.getByPlaceholderText('Search')
  userEvent.type(searchInput, 'Contest1')

  const expectedText = 'Contest1'
  const unexpectedText = 'Contest2'
  await waitFor(() => expect(screen.getByText(expectedText)).toBeInTheDocument)
  await waitFor(
    () => expect(screen.getByText(unexpectedText)).not.toBeInTheDocument
  )
})
