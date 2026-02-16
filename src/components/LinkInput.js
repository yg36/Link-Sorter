'use client'
import { TextField, Button, Box } from '@mui/material'
import { useState } from 'react'
import { useLinks } from '../context/LinkContext'
import { Sparkles } from 'lucide-react'

export default function LinkInput() {
  const [text, setText] = useState('')
  const { addLinks } = useLinks()

  const handleAdd = () => {
    const urls = text.split(/[\s,]+/).filter(u => u.startsWith('http'))
    addLinks(urls)
    setText('')
  }

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: '18px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Paste multiple links..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'transparent',
            color: 'var(--text)',
            borderRadius: '14px',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'var(--border)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--accent)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--accent)',
              boxShadow: '0 0 0 3px rgba(99,102,241,0.25)',
            }
          },
          '& .MuiInputBase-input': {
            color: 'var(--text)',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'var(--muted)',
            opacity: 1,
          }
        }}
      />

      <Button
        onClick={handleAdd}
        variant="contained"
        startIcon={<Sparkles size={18} />}
        sx={{
          mt: 2,
          px: 3,
          py: 1.2,
          borderRadius: '12px',
          background: 'var(--accent)',
          color: '#fff',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 8px 20px rgba(99,102,241,0.4)',
          transition: 'all 0.25s ease',
          '&:hover': {
            background: 'var(--accent)',
            transform: 'translateY(-2px) scale(1.03)',
            boxShadow: '0 14px 30px rgba(99,102,241,0.5)',
          }
        }}
      >
        Organize
      </Button>
    </Box>
  )
}
