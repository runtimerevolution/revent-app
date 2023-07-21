import React from 'react'
import Profile from '../../pages/profile'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

test('Check if specific text appears on the page', () => {
  render(<Profile />)
  const expectedText = 'profile'

  expect(screen.getByText(expectedText)).toBeInTheDocument()
})
