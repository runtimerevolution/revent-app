import React from 'react'
import { render } from '@testing-library/react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Layout from 'components/Layout'

describe('Header Component', function () {
  it('should have Welcome to Revent!', function () {
    let { getByText } = render(<Header />)
    expect(getByText('Welcome to Revent!')).toMatchInlineSnapshot(`
      <h1>
        Welcome to Revent!
      </h1>
    `)
  })
})

describe('Footer Component', function () {
  it('should have FOOTER', function () {
    let { getByText } = render(<Footer />)
    expect(getByText('FOOTER')).toMatchInlineSnapshot(`
      <footer>
        FOOTER
      </footer>
    `)
  })
})

describe('Layout Component', function () {
  it('should have Header and Footer', function () {
    let { getByText } = render(<Layout />)
    expect(getByText('Welcome to Revent!')).toMatchInlineSnapshot(`
      <h1>
        Welcome to Revent!
      </h1>
    `)
    expect(getByText('FOOTER')).toMatchInlineSnapshot(`
          <footer>
            FOOTER
          </footer>
      `)
  })
})

describe('Layout Component', function () {
  it('should have Header, Test h1 and Footer', function () {
    let { getByText } = render(
      <Layout>
        <h1>Test h1</h1>
      </Layout>
    )
    expect(getByText('Welcome to Revent!')).toMatchInlineSnapshot(`
      <h1>
        Welcome to Revent!
      </h1>
    `)
    expect(getByText('Test h1')).toMatchInlineSnapshot(`
      <h1>
        Test h1
      </h1>
    `)
    expect(getByText('FOOTER')).toMatchInlineSnapshot(`
        <footer>
          FOOTER
        </footer>
    `)
  })
})
