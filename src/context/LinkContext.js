'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { loadLinks, saveLinks } from '../utils/storage'
import { detectGroup } from '../utils/grouping'
import { v4 as uuid } from 'uuid'

const LinkContext = createContext()

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([])

  // Load on mount
  useEffect(() => {
    setLinks(loadLinks())
  }, [])

  // Persist whenever links change
  useEffect(() => {
    saveLinks(links)
  }, [links])

  const addLinks = (urls) => {
    const newLinks = urls.map(url => ({
      id: uuid(),
      url,
      note: '',
      group: detectGroup(url),
      createdAt: new Date().toISOString()
    }))
    setLinks(prev => [...prev, ...newLinks])
  }

  const updateNote = (id, note) => {
    setLinks(prev =>
      prev.map(l => l.id === id ? { ...l, note } : l)
    )
  }

  const deleteLink = (id) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const reorder = (newOrder) => {
    setLinks(newOrder)
  }

  return (
    <LinkContext.Provider value={{
      links,
      addLinks,
      updateNote,
      deleteLink,   // 👈 THIS was missing
      reorder
    }}>
      {children}
    </LinkContext.Provider>
  )
}

export const useLinks = () => useContext(LinkContext)
