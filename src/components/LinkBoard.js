'use client'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'
import { useLinks } from '../context/LinkContext'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import LinkCard from './LinkCard'

export default function LinkBoard() {
  const { links, reorder } = useLinks()

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id)
      const newIndex = links.findIndex((l) => l.id === over.id)
      reorder(arrayMove(links, oldIndex, newIndex))
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={links.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3 },
              columnGap: 3,
              transition: 'all 0.4s ease',

              // Smooth fade for board
              animation: 'fadeInBoard 0.6s ease',

              // Dark / Light adaptive styling
              background:
                'linear-gradient(135deg, var(--bg-gradient-1), var(--bg-gradient-2))',
              padding: 2,
              borderRadius: 4
            }}
          >
            {links.map((link) => (
              <Box
                key={link.id}
                sx={{
                  breakInside: 'avoid',
                  mb: 3,

                  // Floating feel
                  transition: 'transform 0.3s ease',

                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <LinkCard link={link} />
              </Box>
            ))}
          </Box>
        </motion.div>
      </SortableContext>

      {/* Local animation */}
      <style jsx global>{`
        @keyframes fadeInBoard {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </DndContext>
  )
}
