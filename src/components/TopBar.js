'use client'
import { Link2 } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="hero-wrapper">

      <div className="hero-particles"></div>

      <div className="logo-container">
        <div className="logo-glow"></div>
        <div className="logo-circle">
          <Link2 size={26} />
        </div>
      </div>

      <h1 className="hero-title">
        Smart Link Sorter
        <span className="title-underline"></span>
      </h1>

      <div className="version-badge">v1.0</div>

      <p className="hero-subtitle">
        Paste your links. Watch them organize themselves.
        Clean, grouped, searchable — instantly.
      </p>

    </div>
  )
}
