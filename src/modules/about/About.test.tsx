import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { About } from './About'

describe('About Component DOM Test', () => {
  it('renders the heading correctly', () => {
    render(<About />)
    const heading = screen.getByText('About Me')
    expect(heading).toBeInTheDocument()
  })

  it('renders the summary from the CMS store', () => {
    render(<About />)
    // The CMS store initialized with Kavin's resume data
    const summaryText = screen.getByText(/Detail-oriented Full Stack Developer/i)
    expect(summaryText).toBeInTheDocument()
  })

  it('renders certifications correctly', () => {
    render(<About />)
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Programming in Java')).toBeInTheDocument()
    expect(screen.getAllByText('NPTEL — IIT Certified').length).toBe(2)
  })
})
