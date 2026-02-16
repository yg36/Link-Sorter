export const saveLinks = (links) =>
  localStorage.setItem('smart-links', JSON.stringify(links))

export const loadLinks = () => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('smart-links')
  return data ? JSON.parse(data) : []
}
