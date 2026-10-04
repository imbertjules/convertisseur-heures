import { useEffect } from 'react'
import { SITE_URL } from '../lib/site.js'

export default function PageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`)
  }, [title, description, path])
  return null
}
