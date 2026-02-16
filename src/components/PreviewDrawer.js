'use client'
import { Drawer } from '@mui/material'

export default function PreviewDrawer({ open, url, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <iframe
        src={url}
        width="600"
        height="100%"
        style={{ border: 'none' }}
      />
    </Drawer>
  )
}
