'use client'

import { useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LOCATIONS = [
  'Switzerland',
  'Slovenia',
  'Serbia',
  'Croatia',
  'Italy',
  'the rest of Europe',
]

/* ── Detail row ──────────────────────────────────────────────────────────── */
function DetailRow({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 'var(--gutter)',
        alignItems: 'baseline',
      }}
    >
      <div
        className="body-14 uppercase"
        style={{ color: 'var(--color-navy)', opacity: 0.4 }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default function ContactPage() {
  const pageRef  = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cityRefs = useRef<(HTMLSpanElement | null)[]>([])

  /* ── City cycling ─────────────────────────────────────────────────── */
  useEffect(() => {
    let current = 0
    const els = cityRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (!els.length) return

    /* Initial state: first visible, rest below */
    els.forEach((el, i) => gsap.set(el, { yPercent: i === 0 ? 0 : 100 }))

    const cycle = () => {
      const next = (current + 1) % els.length
      gsap.to(els[current], { yPercent: -110, duration: 0.55, ease: 'power3.inOut' })
      gsap.fromTo(
        els[next],
        { yPercent: 110 },
        { yPercent: 0, duration: 0.55, ease: 'power3.out', delay: 0.05 }
      )
      current = next
    }

    const id = setInterval(cycle, 2200)
    return () => clearInterval(id)
  }, [])

  /* ── Title + detail reveals ───────────────────────────────────────── */
  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0, y: 24, duration: 1.1, ease: 'power3.out', delay: 0.1,
      })
    }

    /* Stagger-reveal each detail row */
    gsap.utils.toArray<HTMLElement>('[data-detail]').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 16, duration: 0.9, ease: 'power3.out',
        delay: 0.3 + i * 0.1,
      })
    })
  }, { scope: pageRef })

  return (
    <>
      <Header />
      <main
        ref={pageRef}
        data-bg="light"
        style={{ background: 'var(--color-off-white)', minHeight: '100svh' }}
      >
        <div
          className="grid-w"
          style={{
            paddingTop:    'calc(var(--header-height) + var(--margin) * 8)',
            paddingBottom: 'calc(var(--margin) * 6)',
            alignItems:    'end',
            minHeight:     '100svh',
          }}
        >

          {/* ── Left: headline + socials ──────────────────────────────── */}
          <div
            className="col-span-full xl:col-span-6 flex flex-col justify-between"
            style={{ gap: 'calc(var(--margin) * 5)', marginBottom: 'calc(var(--margin) * 5)' }}
          >
            <h1
              ref={titleRef}
              className="body-36 md:body-48 lg:body-60"
              style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.12 }}
            >
              Based in Morcote but available for your projects&nbsp;in{' '}
              {/* Cycling location container */}
              <span
                className="relative inline-flex overflow-hidden align-bottom"
                style={{ minWidth: '16rem', height: '1.2em' }}
              >
                {LOCATIONS.map((loc, i) => (
                  <span
                    key={i}
                    ref={el => { cityRefs.current[i] = el }}
                    className="inline-block"
                    style={{
                      position:   i === 0 ? 'relative' : 'absolute',
                      top: 0, left: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {loc}
                  </span>
                ))}
              </span>
            </h1>

            {/* Desktop socials */}
            <div className="hidden xl:flex" style={{ gap: '2rem' }}>
              <a
                href="https://www.instagram.com/belvedereproperties/"
                target="_blank"
                rel="noopener"
                className="link-underline body-14"
                style={{ color: 'var(--color-navy)' }}
              >
                Instagram,
              </a>
              <a
                href="https://www.linkedin.com/company/belvedere-properties"
                target="_blank"
                rel="noopener"
                className="link-underline body-14"
                style={{ color: 'var(--color-navy)' }}
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── Mobile image ──────────────────────────────────────────── */}
          <div
            className="col-span-full xl:hidden"
            style={{ marginBottom: 'calc(var(--margin) * 4)' }}
          >
            <div className="relative w-full overflow-hidden" style={{ paddingTop: '100%' }}>
              <Image
                src="/projects/Via-bellini_2/1 dnevna 2.webp"
                alt="Via Bellini II interior — residential design by Belvedere Properties, Italy"
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Right: contact details ────────────────────────────────── */}
          <div className="col-span-full xl:col-start-8 xl:col-end-13">

            {/* Email */}
            <div data-detail>
              <div
                style={{
                  width: '100%', height: '1px',
                  background: 'var(--color-navy)', opacity: 0.1,
                  marginBottom: '2rem',
                }}
              />
              <DetailRow label="Business">
                <a
                  href="mailto:maja.lozej@belvedere-properties.ch"
                  className="link-underline body-20"
                  style={{ color: 'var(--color-navy)' }}
                >
                  maja.lozej@belvedere-properties.ch
                </a>
              </DetailRow>
            </div>

            {/* Phone */}
            <div data-detail style={{ marginTop: 'calc(var(--margin) * 1.5)' }}>
              <div
                style={{
                  width: '100%', height: '1px',
                  background: 'var(--color-navy)', opacity: 0.1,
                  marginBottom: '2rem',
                }}
              />
              <DetailRow label="Phone">
                <a
                  href="tel:+41793982999"
                  className="link-underline body-20"
                  style={{ color: 'var(--color-navy)' }}
                >
                  +41 79 398 29 99
                </a>
              </DetailRow>
            </div>

            {/* Address + desktop image */}
            <div data-detail style={{ marginTop: 'calc(var(--margin) * 3)' }}>
              <div
                style={{
                  width: '100%', height: '1px',
                  background: 'var(--color-navy)', opacity: 0.1,
                  marginBottom: '2rem',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: 'var(--gutter)',
                }}
              >
                {/* Address */}
                <div className="flex flex-col justify-between" style={{ gap: '2rem' }}>
                  <div
                    className="body-14 uppercase"
                    style={{ color: 'var(--color-navy)', opacity: 0.4 }}
                  >
                    Address
                  </div>
                  <address
                    className="body-20"
                    style={{ color: 'var(--color-navy)', fontStyle: 'normal', lineHeight: 1.7 }}
                  >
                    Strada Cons. Achille Isella 11<br />
                    6922 Morcote<br />
                    Switzerland
                  </address>
                </div>

                {/* Desktop image */}
                <div className="max-md:hidden">
                  <div className="relative w-full overflow-hidden" style={{ paddingTop: '110%' }}>
                    <Image
                      src="/projects/Via-bellini_2/1 dnevna 2.webp"
                      alt="Via Bellini II interior — residential design by Belvedere Properties, Italy"
                      fill
                      className="object-cover"
                      sizes="20vw"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile socials */}
            <div
              className="xl:hidden"
              style={{ marginTop: 'calc(var(--margin) * 3)' }}
            >
              <div
                style={{
                  width: '100%', height: '1px',
                  background: 'var(--color-navy)', opacity: 0.1,
                  marginBottom: '2rem',
                }}
              />
              <div className="body-14 uppercase" style={{ color: 'var(--color-navy)', opacity: 0.4, marginBottom: '1.2rem' }}>
                Socials
              </div>
              <div className="flex body-20" style={{ gap: '2rem' }}>
                <a
                  href="https://www.instagram.com/belvedereproperties/"
                  target="_blank"
                  rel="noopener"
                  className="link-underline"
                  style={{ color: 'var(--color-navy)' }}
                >
                  Instagram,
                </a>
                <a
                  href="https://www.linkedin.com/company/belvedere-properties"
                  target="_blank"
                  rel="noopener"
                  className="link-underline"
                  style={{ color: 'var(--color-navy)' }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
