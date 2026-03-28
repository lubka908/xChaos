import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Chaos & Attractors | Interactive Exploration',
  description: 'Explore the beautiful world of chaos theory and strange attractors through interactive visualizations',
  keywords: ['chaos theory', 'attractors', 'mathematics', 'Lorenz attractor', 'dynamic systems'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {children}
    </>

  )
}