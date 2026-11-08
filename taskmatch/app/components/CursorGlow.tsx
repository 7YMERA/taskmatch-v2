'use client'

/* Feeds the pointer position to the card under it as --mx / --my, so the
   .tm-card-hover / .tm-glow light in globals.css can follow the cursor.
   One listener for the whole app; does nothing on touch screens. */

import { useEffect } from 'react'

export default function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    let last: PointerEvent | null = null
    const paint = () => {
      frame = 0
      if (!last) return
      const el = (last.target as Element | null)?.closest?.('.tm-card-hover, .tm-glow') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - r.left}px`)
      el.style.setProperty('--my', `${last.clientY - r.top}px`)
    }
    const onMove = (e: PointerEvent) => { last = e; if (!frame) frame = requestAnimationFrame(paint) }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); if (frame) cancelAnimationFrame(frame) }
  }, [])
  return null
}
