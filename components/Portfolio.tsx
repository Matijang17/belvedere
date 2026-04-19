'use client'

import WorkItem from '@/components/WorkItem'
import { PROJECTS } from '@/lib/projects'

const FEATURED = PROJECTS.slice(2, 3)

export default function Portfolio() {
  return (
    <section
      style={{
        background: 'var(--color-white)',
        overflowX: 'hidden',
        paddingBottom: 'calc(var(--margin)*6)',
      }}
      data-bg="light"
      aria-labelledby="works-h"
    >
      {/* Section header */}
      <div
        className="flex justify-between body-12 uppercase"
        style={{
          paddingInline: 'var(--margin)',
          paddingTop: 'calc(var(--margin)*6)',
          paddingBottom: 'calc(var(--margin)*2)',
          letterSpacing: '0.2em',
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 id="works-h" style={{ color: 'var(--color-mist)' }}>Selected Works</h2>
        </div>
        <div className="max-xl:hidden" style={{ color: 'var(--color-mist)' }}>02</div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', color: 'var(--color-mist)' }}>
          21&nbsp;—&nbsp;24
        </div>
      </div>

      <div>
        {FEATURED.map(p => <WorkItem key={p.id} p={p} headingAs="h3" />)}
      </div>
    </section>
  )
}
