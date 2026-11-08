'use client'

/* Drag-to-compare: TaskMatch v1 (the final-year project) against v2.
   A range input sits over the images, so it works with a mouse, a finger or
   the arrow keys. Screenshots live in /public/compare. */

import { useState } from 'react'
import { Icon } from './ui'

const SHOTS = [
  { key: 'dashboard', label: 'Dashboard', note: 'From totals to answers: trends, what needs attention today, and whether work is going to the right people.' },
  { key: 'landing', label: 'Landing', note: 'From a student-project splash page to a product page that shows a real match and opens a demo in one click.' },
  { key: 'tasks', label: 'Tasks', note: 'From one long list to list, board and calendar views, with saved filters and quick search.' },
  { key: 'people', label: 'People', note: "From a list of students to a team view: who's free, team load in hours, and skill gaps." },
  { key: 'match', label: 'Matching', note: 'From a ranked list with a "below min" tag to everyone scored out of 100, with the reasons shown.' },
] as const

export default function BeforeAfter() {
  const [active, setActive] = useState<(typeof SHOTS)[number]['key']>('dashboard')
  const [pos, setPos] = useState(50)
  const shot = SHOTS.find(s => s.key === active)!

  return (
    <div>
      <div className="tm-pills justify-center mb-5" role="tablist" aria-label="Screen to compare">
        {SHOTS.map(s => (
          <button key={s.key} role="tab" aria-selected={active === s.key} aria-pressed={active === s.key}
            className="tm-pill" onClick={() => { setActive(s.key); setPos(50) }}>{s.label}</button>
        ))}
      </div>
      <div className="tm-card overflow-hidden max-w-5xl mx-auto">
        <div className="tm-ba" style={{ '--pos': `${pos}%` } as React.CSSProperties}>
          <img src={`/compare/tm-${active}-v2.webp`} alt={`TaskMatch v2 ${shot.label.toLowerCase()} screen`} />
          <img className="before" src={`/compare/tm-${active}-v1.webp`} alt={`TaskMatch v1 ${shot.label.toLowerCase()} screen, from the final-year project`} />
          <span className="tag l">v1 · final-year project</span>
          <span className="tag r">v2 · today</span>
          <div className="handle"><span className="knob"><Icon name="chevrons" size={16} style={{ transform: 'rotate(90deg)' }} /></span></div>
          <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))}
            aria-label={`Drag to compare v1 and v2 ${shot.label.toLowerCase()}`} />
        </div>
        <p className="px-5 py-4 text-sm text-muted border-t border-line">{shot.note}</p>
      </div>
    </div>
  )
}
