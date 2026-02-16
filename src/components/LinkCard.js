'use client'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  IconButton,
  Chip
} from '@mui/material'
import {
  ExternalLink,
  GripVertical,
  Trash2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { faviconUrl, randomColor } from '../utils/Favicon'
import { useLinks } from '../context/LinkContext'

export default function LinkCard({ link }) {
  const context = useLinks()
  const updateNote = context?.updateNote
  const deleteLink = context?.deleteLink

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const accentColor = randomColor()

  // Safe domain extraction
  let domain = ''
  try {
    domain = new URL(
      link.url.startsWith('http') ? link.url : `https://${link.url}`
    ).hostname.replace('www.', '')
  } catch {
    domain = link.url
  }

  const formattedDate = link.createdAt
    ? new Date(link.createdAt).toLocaleDateString()
    : 'Recently added'

  const handleDelete = () => {
    if (!deleteLink) return
    const confirmed = window.confirm('Delete this link?')
    if (confirmed) deleteLink(link.id)
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          mb: 3,
          borderRadius: '22px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isDragging
            ? '0 30px 70px rgba(0,0,0,0.35)'
            : '0 12px 28px rgba(0,0,0,0.12)',
          transition: 'all 0.25s ease',
          px: { xs: 2, sm: 3 },
          py: 2,
          '&:hover': {
            boxShadow: '0 18px 45px rgba(0,0,0,0.18)'
          }
        }}
      >
        <CardContent sx={{ p: 0 }}>

          {/* HEADER */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              mb: 1.5
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flex: 1,
                minWidth: 0
              }}
            >
              <Box
                {...attributes}
                {...listeners}
                sx={{
                  cursor: 'grab',
                  color: 'var(--muted)',
                  display: 'flex'
                }}
              >
                <GripVertical size={18} />
              </Box>

              <img
                src={faviconUrl(link.url)}
                width="22"
                height="22"
                style={{ borderRadius: '6px' }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    color: 'var(--text)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    '&:hover': { color: accentColor }
                  }}
                >
                  {domain}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'var(--muted)'
                  }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Box>

            {/* ACTIONS */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'var(--text)',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                    color: accentColor
                  }
                }}
              >
                <ExternalLink size={18} />
              </IconButton>

              <IconButton
                onClick={handleDelete}
                sx={{
                  color: 'var(--muted)',
                  '&:hover': {
                    color: '#ef4444'
                  }
                }}
              >
                <Trash2 size={18} />
              </IconButton>
            </Box>
          </Box>

          {/* TAGS */}
          {link.tags?.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 1.5
              }}
            >
              {link.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    background: `${accentColor}22`,
                    color: accentColor,
                    fontSize: '0.7rem',
                    borderRadius: '8px'
                  }}
                />
              ))}
            </Box>
          )}

          {/* NOTE */}
          <TextField
            fullWidth
            size="small"
            placeholder="Add a note about this link..."
            value={link.note}
            onChange={(e) =>
              updateNote && updateNote(link.id, e.target.value)
            }
            multiline
            minRows={1}
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
                '& fieldset': {
                  borderColor: 'var(--border)'
                },
                '&:hover fieldset': {
                  borderColor: accentColor
                },
                '&.Mui-focused fieldset': {
                  borderColor: accentColor
                }
              },
              '& textarea': {
                color: 'var(--text)',
                fontSize: '0.9rem'
              }
            }}
          />

        </CardContent>
      </Card>
    </motion.div>
  )
}
