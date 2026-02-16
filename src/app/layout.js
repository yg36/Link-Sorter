'use client'
import { useState, useEffect } from 'react'
import './globals.css'

export default function RootLayout({ children }) {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode')

    if (saved) {
      setMode(saved)
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setMode(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
