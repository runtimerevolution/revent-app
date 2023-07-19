import React from 'react'
import Profile from '../../pages/profile'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

test('renders example component', async () => {
  render(<Profile />)
  const textElement = screen.getByText('profile')
  expect(textElement).toBeInTheDocument()

  await waitFor(() => {
    expect(textElement).toBeInTheDocument()
  })
})

test('Check if specific text appears on the page', () => {
  const { getByText } = render(<Profile />)
  const expectedText = 'profile'

  expect(getByText(expectedText)).toBeInTheDocument()
})
