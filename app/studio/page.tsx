'use client'

import { useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ValuesVision from '@/components/ValuesVision'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ── Team members ───────────────────────────────────────────────────────── */
const TEAM = [
  {
    name:  'Maja Lozej',
    role:  'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
  },
  {
    name:  'Nika Simoniti Jenko',
    role:  'Office manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
  },
  {
    name:  'Jelena Kovacevic',
    role:  'Senior interior designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  },
  {
    name:  'Djordje Jovic',
    role:  'Interior designer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
  },
  {
    name:  'Danijela Gajanovic',
    role:  'Procurement',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
  },
  {
    name:  'Tilen Cebohin',
    role:  'Creative wodworking',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
  },
]

/* ── Corner mark helpers ─────────────────────────────────────────────────── */
function CornerMark({ pos }: { pos: 'bl' | 'br' }) {
  const isLeft = pos === 'bl'
  return (
    <div aria-hidden="true" style={{
      position: 'absolute',
      [isLeft ? 'left' : 'right']: 0,
      bottom: 0,
      width: '5rem', height: '5rem',
    }}>
      {/* Horizontal */}
      <div style={{
        position: 'absolute', top: 0,
        [isLeft ? 'left' : 'right']: '1rem',
        width: '3rem', height: '1px',
        background: 'var(--color-navy)', opacity: 0.3,
      }} />
      {/* Vertical */}
      <div style={{
        position: 'absolute', bottom: '1rem',
        [isLeft ? 'right' : 'left']: 0,
        width: '1px', height: '3rem',
        background: 'var(--color-navy)', opacity: 0.3,
      }} />
    </div>
  )
}

export default function StudioPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const descRef     = useRef<HTMLDivElement>(null)
  const imgWrapRef  = useRef<HTMLDivElement>(null)
  const imgInnerRef = useRef<HTMLDivElement>(null)
  const quoteRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)

  const [activeTeam, setActiveTeam] = useState(0)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* ── Title SplitText reveal ──────────────────────────────────── */
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%', once: true },
      })
    }

    /* ── Description SplitText reveal ───────────────────────────── */
    if (descRef.current) {
      const split = new SplitText(descRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.0, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: descRef.current, start: 'top 85%', once: true },
      })
    }

    /* ── Cover image parallax ────────────────────────────────────── */
    if (imgInnerRef.current && imgWrapRef.current) {
      gsap.to(imgInnerRef.current, {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1,
        },
      })
    }

    /* ── Quote SplitText reveal ──────────────────────────────────── */
    if (quoteRef.current) {
      const split = new SplitText(quoteRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.1, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true },
      })
    }

    /* ── Team subtitle slide-in ──────────────────────────────────── */
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%', once: true },
      })
    }

  }, { scope: pageRef })

  return (
    <>
      <Header />
      <main ref={pageRef} data-bg="light" style={{ background: 'var(--color-off-white)' }}>

        {/* ── Cover section ─────────────────────────────────────────────── */}
        <div className="block relative" style={{ paddingBottom: 'calc(var(--margin) * 6)' }}>

          <CornerMark pos="bl" />
          <CornerMark pos="br" />

          {/* ── Row 1: Title + scroll hint ──────────────────────────── */}
          <div
            className="grid-w"
            style={{
              paddingTop: 'calc(var(--header-height) + var(--margin) * 6)',
              marginBottom: 'calc(var(--margin) * 3)',
            }}
          >
            <div className="col-span-full md:col-span-8 lg:col-span-7">
              <h1
                ref={titleRef}
                className="body-36 md:body-48 lg:body-60"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.12 }}
              >
                Belvedere Properties SA is a Lugano,
                Switzerland-based architecture &amp; interior design studio.
              </h1>
            </div>
            <div
              className="col-start-11 col-end-13 flex justify-end items-end max-md:hidden"
              style={{ color: 'var(--color-navy)', opacity: 0.35 }}
            >
              <span className="body-12 uppercase" style={{ letterSpacing: '0.15em' }}>[Scroll down]</span>
            </div>
          </div>

          {/* ── Row 2: Description (sticky) + Image ─────────────────── */}
          <div className="grid-w">

            {/* Description — sticky at bottom on desktop */}
            <div
              className="col-span-full md:col-span-5 xl:col-span-4 flex items-end max-md:order-last"
              style={{ paddingBottom: 'var(--margin)' }}
            >
              <div
                ref={descRef}
                className="body-16 md:sticky"
                style={{
                  bottom: 'var(--margin)',
                  color: 'var(--color-navy)',
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                <p>
                  We provide a boutique level of service and a hands-on approach. Underpinning all of our work is an understanding of context, client needs, and the way people experience space — ensuring interiors are meaningful and remain relevant over time.
                </p>
                <p>
                  With experience across private residences, apartments, villas, hospitality, and selected commercial projects, we combine Swiss precision with Mediterranean sensibility — fusing craftsmanship with contemporary vision.
                </p>
              </div>
            </div>

            {/* Image — col 7–13 on md */}
            <div
              className="col-span-full md:col-start-7 md:col-end-13 max-md:my-[3.2rem]"
            >
              <div
                ref={imgWrapRef}
                className="relative w-full overflow-hidden"
                style={{ paddingTop: '115%' }}
              >
                <div
                  ref={imgInnerRef}
                  style={{ position: 'absolute', inset: '-8% 0', height: '116%' }}
                >
                  <Image
                    src="/projects/Casino/Casino_laos_4.webp"
                    alt="Belvedere Properties project — Casino interior, Laos"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px)100vw,50vw"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Quote section ──────────────────────────────────────────────── */}
        <div
          style={{
            paddingInline: 'var(--margin)',
            paddingTop:    'calc(var(--margin) * 5)',
            paddingBottom: 'calc(var(--margin) * 5)',
          }}
        >
          <div className="w-full">
            {/* Inline spacer — pushes quote right on md+ */}
            <span
              className="max-md:hidden"
              style={{ display: 'inline-block', width: 'calc(var(--column) * 2 + var(--gutter) * 2)' }}
            />
            <h2
              ref={quoteRef}
              className="body-48 lg:body-72 inline"
              style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.1 }}
            >
              &ldquo;Each project reflects the vision and precision of our designers,
              turning ideas into spaces of lasting beauty and meaningful purpose.&rdquo;
            </h2>
          </div>
        </div>

        {/* ── Team section ───────────────────────────────────────────────── */}
        <section
          className="block relative"
          style={{
            paddingTop:    'calc(var(--margin) * 7)',
            paddingBottom: 'calc(var(--margin) * 7)',
            background:    'var(--color-off-white)',
          }}
        >
          <CornerMark pos="bl" />
          <CornerMark pos="br" />

          {/* Subtitle */}
          <div className="grid-w" style={{ marginBottom: 'calc(var(--margin) * 2)' }}>
            <div className="col-span-full md:col-span-3">
              <div
                ref={subtitleRef}
                className="flex gap-x-[2.4rem] uppercase body-14"
                style={{ color: 'var(--color-navy)' }}
              >
                <span style={{ opacity: 0.35 }}>01</span>
                <h2>Meet the team</h2>
              </div>
            </div>
          </div>

          {/* ── Mobile: card grid ──────────────────────────────────────── */}
          <div className="md:hidden">
          <div className="grid-w" style={{ gap: 'calc(var(--gutter) * 2)', marginTop: '1.6rem' }}>
            {TEAM.map((member, i) => (
              <div key={i} className="col-span-3">
                <div className="relative w-full overflow-hidden" style={{ paddingTop: '130%', marginBottom: '1.2rem' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="body-14" style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.2 }}>
                  {member.name}
                </div>
                <div className="body-12" style={{ color: 'var(--color-navy)', opacity: 0.5, marginTop: '0.4rem' }}>
                  {member.role}
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* ── Desktop: name list + sticky image ──────────────────────── */}
          <div
            className="hidden md:block relative"
            style={{ marginTop: '-1.5rem' }}
          >
            {/* Name rows */}
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="grid-w"
                style={{ paddingTop: '2rem', paddingBottom: '2rem', cursor: 'default' }}
                onMouseEnter={() => setActiveTeam(i)}
              >
                <div
                  className="col-start-5 col-end-9 flex flex-col"
                  style={{
                    opacity: activeTeam === i ? 1 : 0.25,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  <span
                    className="body-36 lg:body-48"
                    style={{ color: 'var(--color-navy)', fontWeight: 700 }}
                  >
                    {member.name}
                  </span>
                  <span
                    className="body-14"
                    style={{ color: 'var(--color-navy)', marginTop: '0.5rem' }}
                  >
                    {member.role}
                  </span>
                </div>
              </div>
            ))}

            {/* Sticky image panel */}
            <div className="absolute inset-0 grid-w pointer-events-none">
              <div
                className="col-start-10 col-end-13"
                style={{ position: 'sticky', top: '10rem' }}
              >
                <div className="relative w-full" style={{ paddingTop: '133%' }}>
                  {TEAM.map((member, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute', inset: 0,
                        opacity: activeTeam === i ? 1 : 0,
                        transition: 'opacity 0.45s ease',
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="25vw"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>
                {/* Name + role below image */}
                <div style={{ marginTop: '1.4rem', position: 'relative', height: '4rem', overflow: 'hidden' }}>
                  {TEAM.map((member, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute', top: 0, left: 0, width: '100%',
                        opacity: activeTeam === i ? 1 : 0,
                        transition: 'opacity 0.45s ease',
                      }}
                    >
                      <div className="body-14" style={{ color: 'var(--color-navy)', fontWeight: 700 }}>
                        {member.name}
                      </div>
                      <div className="body-12" style={{ color: 'var(--color-navy)', opacity: 0.5, marginTop: '0.3rem' }}>
                        {member.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ValuesVision />

        {/* ── Contact strip ──────────────────────────────────────────────── */}
        <div
          className="grid-w"
          style={{
            paddingTop:    'calc(var(--margin) * 4)',
            paddingBottom: 'calc(var(--margin) * 4)',
            background:    'var(--color-navy)',
          }}
          data-bg="dark"
        >
          <div className="col-span-full md:col-span-6">
            <p
              className="body-12 uppercase"
              style={{ color: 'var(--color-champagne)', letterSpacing: '0.2em', marginBottom: '1.2rem' }}
            >
              Based in Switzerland
            </p>
            <p
              className="body-14"
              style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}
            >
              Strada Cons. Achille Isella 11<br />
              6922 Morcote, Switzerland
            </p>
          </div>
          <div className="col-span-full md:col-start-9 md:col-end-13 flex items-center justify-end">
            <Link
              href="/contact"
              className="body-12 uppercase"
              style={{
                display: 'inline-block',
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: '0.12em',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '2rem',
                padding: '1rem 2.8rem',
              }}
            >
              Get in touch&nbsp;→
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
