import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ContestCardClosed from '../../components/ContestCardClosed'

test('checks if specific text appears on the ContestCard', () => {
  const contest = {
    id: 2,
    title: 'Becky Schneider',
    description: 'Sort prevent kitchen art question.',
    prize: 'Citizen instead owner bar woman still think build.',
    upload_phase_end: '1972-10-27T15:14:44+00:00',
    upload_phase_start: '2023-06-05T10:43:02.430645+00:00',
    voting_phase_end: '1977-12-22T06:09:35+00:00',
    cover_picture: {
      file: 'https://www.jquery-az.com/html/images/banana.jpg',
    },
    status: 'closed',
  }

  const { getByText } = render(<ContestCardClosed contest={contest} />)

  const title = getByText('Becky Schneider')
  expect(title).toBeInTheDocument()
})
