export const detectGroup = (url) => {
  try {
    const domain = new URL(url).hostname

    if (domain.includes('youtube')) return 'Videos'
    if (domain.includes('github')) return 'Dev Tools'
    if (domain.includes('docs')) return 'Docs'
    if (domain.includes('medium') || domain.includes('blog')) return 'Articles'

    return 'Others'
  } catch {
    return 'Invalid'
  }
}
