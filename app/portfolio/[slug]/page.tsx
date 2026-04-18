'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { PROJECTS } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ── Corner mark (reused from studio page) ───────────────────────────── */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const top    = pos === 'tl' || pos === 'tr'
  const left   = pos === 'tl' || pos === 'bl'
  return (
    <div aria-hidden="true" style={{
      position: 'absolute',
      [top  ? 'top'    : 'bottom']: 0,
      [left ? 'left'   : 'right']:  0,
      width: '6rem', height: '6rem',
    }}>
      <div style={{
        position: 'absolute',
        [top  ? 'bottom' : 'top']:  0,
        [left ? 'left'   : 'right']: '1rem',
        width: '3rem', height: '1px',
        background: 'var(--color-navy)', opacity: 0.2,
      }} />
      <div style={{
        position: 'absolute',
        [top  ? 'top'    : 'bottom']: '1rem',
        [left ? 'right'  : 'left']:   0,
        width: '1px', height: '3rem',
        background: 'var(--color-navy)', opacity: 0.2,
      }} />
    </div>
  )
}

export default function ProjectPage() {
  const params = useParams()
  const slug   = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const p      = PROJECTS.find(x => x.slug === slug)

  if (!p) return notFound()

  const nextP = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length]

  /* refs */
  const pageRef    = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgInnerRef= useRef<HTMLDivElement>(null)
  const quoteRef   = useRef<HTMLHeadingElement>(null)
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Title reveal */
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.1, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
      })
    }

    /* Hero image parallax */
    if (imgInnerRef.current && imgWrapRef.current) {
      gsap.to(imgInnerRef.current, {
        y: '-8%', ease: 'none',
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: 1,
        },
      })
    }

    /* Quote reveal */
    if (quoteRef.current) {
      const split = new SplitText(quoteRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.0, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', once: true },
      })
    }

    /* Detail divider lines — scaleX reveal */
    lineRefs.current.forEach(el => {
      if (!el) return
      gsap.from(el, {
        scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, { scope: pageRef })

  return (
    <>
      <Header />
      <div ref={pageRef} data-bg="light" style={{ background: 'var(--color-white)' }}>

        {/* ── 1. Cover ──────────────────────────────────────────────────── */}
        <section
          className="relative"
          style={{ paddingBottom: 'calc(var(--margin) * 3)', background: 'var(--color-off-white)' }}
        >
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* Title + tags */}
          <div className="grid-w" style={{ paddingTop: 'calc(var(--header-height) + var(--margin) * 5)' }}>

            {/* h1 */}
            <div className="col-span-full md:col-span-9" style={{ marginBottom: 'calc(var(--margin) * 2)', overflow: 'hidden' }}>
              <h1
                ref={titleRef}
                className="body-48 md:body-60"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.08 }}
              >
                {p.title}
              </h1>
            </div>

            {/* Tags row */}
            <div
              className="col-span-full grid grid-cols-2 md:grid-cols-4"
              style={{ gap: '2rem var(--gutter)', marginBottom: 'calc(var(--margin) * 3)' }}
            >
              {[
                { label: 'Client',   value: p.client   },
                { label: 'Typology', value: p.typology },
                { label: 'Year',     value: p.year     },
                { label: 'Status',   value: p.status   },
              ].map((tag) => (
                <div key={tag.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(11,29,61,0.1)', paddingTop: '1.2rem' }}>
                  <span className="body-12 uppercase" style={{ color: 'var(--color-champagne)', letterSpacing: '0.12em' }}>
                    {tag.label}
                  </span>
                  <span className="body-14" style={{ color: 'var(--color-navy)', opacity: 0.8 }}>
                    {tag.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width hero image */}
          <div style={{ paddingInline: 'var(--margin)', overflow: 'hidden' }}>
            <div
              ref={imgWrapRef}
              className="relative w-full overflow-hidden"
              style={{ paddingTop: '55%' }}
            >
              <div
                ref={imgInnerRef}
                style={{ position: 'absolute', inset: '-8% 0', height: '116%' }}
              >
                <Image
                  src={p.image}
                  alt={`${p.title} — ${p.discipline}, ${p.location} — Belvedere Properties`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Project details ────────────────────────────────────────── */}
        <section
          className="relative grid-w"
          style={{
            paddingTop:    'var(--margin)',
            paddingBottom: 'calc(var(--margin) * 6)',
          }}
        >
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* Left: 01 label */}
          <div className="col-span-full md:col-span-4" style={{ marginBottom: 'calc(var(--margin)*2)' }}>
            <div className="flex gap-x-[2.4rem] uppercase body-14" style={{ color: 'var(--color-navy)' }}>
              <span style={{ opacity: 0.35 }}>01</span>
              <span>Project details</span>
            </div>
          </div>

          {/* Right: description + rows */}
          <div className="col-span-full md:col-start-6 xl:col-start-7 md:col-end-13">
            <p
              className="body-16 md:body-20"
              style={{ color: 'var(--color-navy)', opacity: 0.75, lineHeight: 1.8, marginBottom: 'calc(var(--margin)*2.5)' }}
            >
              {p.description}
            </p>

            {/* Detail rows */}
            {[
              { label: 'Location',   value: p.location   },
              { label: 'Discipline', value: p.discipline },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--gutter)',
                  paddingTop: '2rem',
                  marginBottom: 'calc(var(--margin)*1.5)',
                  position: 'relative',
                }}
              >
                <div
                  ref={el => { lineRefs.current[i] = el }}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '1px',
                    background: 'var(--color-navy)', opacity: 0.1,
                  }}
                />
                <span className="body-14" style={{ color: 'var(--color-navy)', opacity: 0.45 }}>
                  {row.label}
                </span>
                <span className="body-14" style={{ color: 'var(--color-navy)', opacity: 0.8 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Sticky images ──────────────────────────────────────────── */}
        <section
          className="grid-w"
          style={{ gap: '1rem', paddingBottom: 'var(--margin)' }}
        >
          {/* Small portrait — sticky bottom on md+ */}
          <div
            className="col-span-full md:col-span-3 flex items-end"
            style={{ marginBottom: 'calc(var(--margin)*2)' }}
          >
            <div
              className="relative w-full overflow-hidden md:sticky"
              style={{ paddingTop: '120%', bottom: 'var(--margin)' }}
            >
              <Image
                src={p.stickyImage}
                alt={`Interior detail · ${p.title} · ${p.location} — Belvedere Properties`}
                fill
                className="object-cover"
                sizes="(max-width:768px)100vw,25vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Large portrait — right side */}
          <div className="col-span-full md:col-start-7 md:col-end-13">
            <div className="relative w-full overflow-hidden" style={{ paddingTop: '122%' }}>
              <Image
                src={p.largeImage}
                alt={`${p.typology} interior · ${p.title} · ${p.location} — Belvedere Properties`}
                fill
                className="object-cover"
                sizes="(max-width:768px)100vw,50vw"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── 4. Quote + About ──────────────────────────────────────────── */}
        <section
          className="grid-w"
          style={{
            paddingTop:    'calc(var(--margin) * 5)',
            paddingBottom: 'calc(var(--margin) * 5)',
          }}
        >
          {/* Big quote — col 1–9 */}
          <div className="col-span-full md:col-span-8 xl:col-span-9" style={{ marginBottom: 'calc(var(--margin)*4)' }}>
            <h2
              ref={quoteRef}
              className="body-36 md:body-48 xl:body-60"
              style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.1 }}
            >
              &ldquo;{p.quote}&rdquo;
            </h2>
          </div>

          {/* 02 label — col 1–4 */}
          <div className="col-span-full md:col-span-4 max-md:order-first" style={{ marginBottom: 'calc(var(--margin)*1.5)' }}>
            <div className="flex gap-x-[2.4rem] uppercase body-14" style={{ color: 'var(--color-navy)' }}>
              <span style={{ opacity: 0.35 }}>02</span>
              <span>About the project</span>
            </div>
          </div>

          {/* Body copy — col 7–13 */}
          <div className="col-span-full md:col-start-7 md:col-end-13">
            <p
              className="body-16 md:body-20"
              style={{ color: 'var(--color-navy)', opacity: 0.7, lineHeight: 1.85 }}
            >
              {p.aboutText}
            </p>
          </div>
        </section>

        {/* ── 5. Gallery ────────────────────────────────────────────────── */}
        {(() => {
          const cols3 = p.gallery.length % 3 === 0 && p.gallery.length >= 3
          return (
            <div
              className={cols3 ? 'grid grid-cols-2 md:grid-cols-3' : 'grid grid-cols-2'}
              style={{
                gap: 'var(--gutter)',
                paddingInline: 'var(--margin)',
                paddingBottom: 'calc(var(--margin) * 5)',
              }}
            >
              {p.gallery.map((src, i) => (
                <div key={i} className="relative w-full overflow-hidden" style={{ paddingTop: '100%' }}>
                  <Image
                    src={src}
                    alt={`${p.title} — view ${i + 1}, ${p.location} — Belvedere Properties`}
                    fill
                    className="object-cover"
                    sizes={cols3 ? '(max-width:768px)50vw,33vw' : '50vw'}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )
        })()}

        {/* ── 6. Back / Next navigation ─────────────────────────────────── */}
        <div
          className="grid-w"
          style={{
            paddingTop:    'calc(var(--margin) * 3)',
            paddingBottom: 'calc(var(--margin) * 3)',
            borderTop:     '1px solid rgba(11,29,61,0.1)',
          }}
        >
          <div className="col-span-full md:col-span-4 flex items-center" style={{ marginBottom: 'calc(var(--margin)*2)' }}>
            <Link
              href="/portfolio"
              className="body-12 uppercase"
              style={{ color: 'var(--color-navy)', opacity: 0.55, letterSpacing: '0.15em' }}
            >
              ← All Works
            </Link>
          </div>

          <div className="col-span-full md:col-start-7 md:col-end-13">
            <Link
              href={`/portfolio/${nextP.slug}`}
              style={{ display: 'flex', gap: '2.4rem', alignItems: 'center', textDecoration: 'none' }}
            >
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{ width: '9rem', height: '7rem' }}
              >
                <Image
                  src={nextP.image}
                  alt={`${nextP.title} — ${nextP.category}, ${nextP.location}`}
                  fill
                  className="object-cover"
                  sizes="144px"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="body-12 uppercase" style={{ color: 'var(--color-navy)', opacity: 0.4, letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
                  Next project
                </div>
                <div className="body-24" style={{ color: 'var(--color-navy)', fontWeight: 700 }}>
                  {nextP.title}
                </div>
                <div className="body-14" style={{ color: 'var(--color-champagne)', marginTop: '0.4rem' }}>
                  {nextP.category} · {nextP.year}
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
