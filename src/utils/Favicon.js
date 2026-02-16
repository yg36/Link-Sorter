import tinycolor from 'tinycolor2'

export const faviconUrl = (url) =>
  `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`

export const randomColor = () =>
  tinycolor.random().toHexString()
