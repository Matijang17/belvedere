'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkItem from '@/components/WorkItem'
import { PROJECTS } from '@/lib/projects'

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main data-bg="light" style={{ background: 'var(--color-white)' }}>

        {/* Page header */}
        <div className="grid-w" style={{
          paddingTop:    'calc(var(--header-height) + var(--margin) * 4)',
          paddingBottom: 'calc(var(--margin) * 2)',
          borderBottom:  '1px solid rgba(11,29,61,0.1)',
          alignItems:    'end',
        }}>
          <div className="col-span-full md:col-span-6">
            <div className="body-12 uppercase" style={{ color: 'var(--color-champagne)', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
              Work
            </div>
            <h1 className="body-48 md:body-72" style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1 }}>
              All Work
              <sup style={{ fontSize: '0.32em', verticalAlign: 'top', marginLeft: '0.3em', color: 'var(--color-champagne)', fontWeight: 400, lineHeight: 1.6 }}>
                ({PROJECTS.length})
              </sup>
            </h1>
          </div>
          <div className="col-span-full md:col-start-9 md:col-end-13 flex items-end" style={{ paddingBottom: '0.4rem' }}>
            <p className="body-12" style={{ color: 'var(--color-navy)', opacity: 0.45, lineHeight: 1.8 }}>
              Architecture &amp; Interior · Morcote, Switzerland
            </p>
          </div>
        </div>

        {/* Works list — same WorkItem as homepage */}
        {PROJECTS.map(p => (
          <WorkItem key={p.id} p={p} headingAs="h2" />
        ))}

      </main>
      <Footer />
    </>
  )
}
