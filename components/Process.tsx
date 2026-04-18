'use client'

import { useState, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STEPS = [
  { n: '01', label: 'Analysis & Objectives',                   img: '/projects/Cappucinni/6.webp',                           alt: 'Schematic design — Via Cappuccini apartment, Italy' },
  { n: '02', label: 'Design Concept',                          img: '/projects/Eda-center/4.webp',                            alt: 'Town planning — Eda Center development, Slovenia' },
  { n: '03', label: 'Materials Development',                   img: '/projects/Via-bellini_2/3 kuhinja c0002 (2).webp',       alt: 'Design development — Via Bellini II kitchen, Italy' },
  { n: '04', label: 'Interior & Furniture Planning',           img: '/projects/Casino/Casino_laos_4.webp',                    alt: 'Project marketing — Casino interior, Laos' },
  { n: '05', label: 'Technical Documentation',                 img: '/projects/My-Skin_bar/01.webp',                          alt: 'Interior design — My Skin Bar, Italy' },
  { n: '06', label: 'Project Coordination',                    img: '/projects/Eda-center/12.webp',                           alt: 'Construction documentation — Eda Center, Slovenia' },
  { n: '07', label: 'Final Handover',                          img: '/projects/belgrade-waterfront/soba A9.webp',             alt: 'Contract administration — Belgrade Waterfront residence, Serbia' },
]

export default function Process() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      data-bg="light"
      style={{ background: 'var(--color-white)', position: 'relative' }}
      aria-labelledby="method-h"
    >
      {/* ── Desktop: flowing text left + sticky image right ─────────── */}
      <div className="hidden xl:flex" style={{ minHeight: '100svh' }}>

        {/* Left: inline flowing service names */}
        <div
          style={{
            flex: '0 0 58%',
            paddingLeft: 'var(--margin)',
            paddingRight: '3rem',
            paddingTop:  'calc(var(--margin) * 7)',
            paddingBottom: 'calc(var(--margin) * 7)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 'clamp(3.8rem, 5.0vw, 6.8rem)', lineHeight: 1.18, letterSpacing: '-0.01em' }}>
            {STEPS.map((s, i) => (
              <Fragment key={s.n}>
                <span
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    display: 'inline',
                    color:      active === i ? 'var(--color-navy)' : 'var(--color-mist)',
                    fontWeight: active === i ? 700 : 400,
                    transition: 'color 0.3s var(--ease-out)',
                    cursor: 'default',
                  }}
                >
                  {s.label}
                  <sup style={{
                    fontSize: '0.35em',
                    verticalAlign: 'top',
                    lineHeight: 2.4,
                    marginLeft: '0.12em',
                    fontWeight: 400,
                    color: active === i ? 'var(--color-champagne)' : 'inherit',
                    transition: 'color 0.3s var(--ease-out)',
                  }}>
                    ({s.n})
                  </sup>
                </span>
                {i < STEPS.length - 1 && (
                  <span style={{ color: 'var(--color-mist)', fontWeight: 400, margin: '0 0.1em' }}> / </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Right: sticky image stack */}
        <div
          style={{
            flex: '0 0 42%',
            position: 'sticky',
            top: 0,
            height: '100svh',
            padding: 'var(--margin)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: (active ?? 0) === i ? 1 : 0,
                  transition: 'opacity 0.55s var(--ease-out)',
                }}
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="42vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: flowing text only ────────────────────────────────── */}
      <div
        className="xl:hidden"
        style={{
          paddingInline: 'var(--margin)',
          paddingTop:    'calc(var(--margin) * 4)',
          paddingBottom: 'calc(var(--margin) * 4)',
        }}
      >
        <div style={{ fontSize: 'clamp(3.2rem, 7vw, 5.2rem)', lineHeight: 1.22, letterSpacing: '-0.01em', color: 'var(--color-navy)' }}>
          {STEPS.map((s, i) => (
            <Fragment key={s.n}>
              <span style={{ display: 'inline', fontWeight: 400 }}>
                {s.label}
                <sup style={{ fontSize: '0.36em', verticalAlign: 'top', lineHeight: 2.2, marginLeft: '0.12em', fontWeight: 400, color: 'var(--color-champagne)' }}>
                  ({s.n})
                </sup>
              </span>
              {i < STEPS.length - 1 && (
                <span style={{ color: 'var(--color-mist)' }}> / </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── Bottom: METHOD label + description + CTA ─────────────────── */}
      <div
        className="grid-w"
        style={{
          paddingBlock: 'calc(var(--margin) * 2)',
          borderTop: '1px solid rgba(11,29,61,0.1)',
          alignItems: 'start',
          rowGap: '2.4rem',
        }}
      >
        {/* Label */}
        <div className="col-span-2">
          <h2
            id="method-h"
            className="body-12 uppercase"
            style={{ letterSpacing: '0.2em', color: 'var(--color-navy)', paddingTop: '0.4rem' }}
          >
            Method
          </h2>
        </div>

        {/* Description */}
        <div className="col-span-4 md:col-span-7">
          <p className="body-14" style={{ color: 'rgba(11,29,61,0.62)', lineHeight: 1.8, maxWidth: '44rem' }}>
            Our structured process covers all stages of interior design and spatial transformation — from initial analysis and concept development through to technical documentation, coordination, and final handover.
          </p>
        </div>

        {/* CTA */}
        <div className="col-span-full md:col-span-3 flex md:justify-end">
          <Link
            href="/services"
            className="body-12 uppercase"
            style={{
              display: 'inline-block',
              color: 'var(--color-navy)',
              letterSpacing: '0.12em',
              border: '1px solid rgba(11,29,61,0.22)',
              borderRadius: '2rem',
              padding: '0.9rem 2.4rem',
              whiteSpace: 'nowrap',
              transition: 'background var(--dur-normal) var(--ease-out), color var(--dur-normal) var(--ease-out)',
            }}
          >
            Method&nbsp;·&nbsp;Discover&nbsp;+
          </Link>
        </div>
      </div>
    </section>
  )
}
