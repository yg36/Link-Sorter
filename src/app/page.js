'use client'
import { useState, useEffect } from 'react'
import { Container, IconButton, Tooltip } from '@mui/material'
import { Sun, Moon, Command } from 'lucide-react'
import { LinkProvider } from '../context/LinkContext'
import LinkInput from '../components/LinkInput'
import LinkBoard from '../components/LinkBoard'
import TopBar from '../components/TopBar'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setMode(current || 'dark')
    setMounted(true)
  }, [])

  const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme')
  const newTheme = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme-mode', newTheme)
}

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!mounted) return null

  return (
    <LinkProvider>
      <div className="animated-bg" />

      <TopBar />

      <Container className="main-container">

        <div className="floating-controls">
          <Tooltip title="Toggle Theme">
            <IconButton className="control-btn" onClick={toggleTheme}>
              {mode === 'dark' ? (
              <Sun size={20} className="theme-icon" />
                ) : (
              <Moon size={20} className="theme-icon" />
              )}
            </IconButton>
          </Tooltip>
        </div>

        <div className="content-wrapper">
          <LinkInput />
          <LinkBoard />
        </div>
      </Container>

      {/* {open && (
        <div className="command-overlay" onClick={() => setOpen(false)}>
          <div
            className="command-palette"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              placeholder="Search links, groups, notes..."
              className="command-input"
            />
          </div>
        </div>
      )} */}
    </LinkProvider>
  )
}
