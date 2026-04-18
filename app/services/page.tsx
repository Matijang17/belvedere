'use client'

import { useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ── Services data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    number:  '01',
    title:   'Interior Design',
    image:   '/projects/Cappucinni/15.webp',
    col1:    'Development of interior concepts, atmosphere studies, moodboards, layouts, and visualisations that define a clear and cohesive design direction. We work closely with each client to understand their needs, lifestyle, and aspirations.',
    col2:    'Spatial planning, material selection, bespoke joinery, lighting strategy, and furniture curation are considered as part of a unified vision. Our work spans private residences, apartments, villas, hospitality spaces, offices, and selected commercial environments.'

  },
  {
    number:  '02',
    title:   'Bespoke Furniture',
    image:   '/projects/Villa-corso/master kop 3.webp',
    col1:    'Design and development of tailored elements including kitchens, wardrobes and storage systems, integrated joinery, and custom solutions for residential and commercial spaces — each designed in response to spatial architecture, proportion, and material expression.',
    col2:    'Production is carried out through a selected network of skilled craftsmen and specialist manufacturers, delivering pieces that are both highly functional and quietly exceptional.',
  },
  {
    number:  '03',
    title:   'Project Consulting',
    image:   '/projects/Casino/Casino_laos_3.webp',
    col1:    'Management and coordination of suppliers, craftsmen, contractors, and delivery phases — ensuring every aspect of the project is executed with precision and on schedule. Strategic guidance for property enhancement, investment opportunities, renovations, and spatial repositioning.',
    col2:    'Our role is to protect the integrity of the design through every phase of delivery — ensuring the precision of the concept is carried through to the precision of the final space. We act as trusted advisors from first conversation to completion.',
  },
]

/* ── Corner mark ────────────────────────────────────────────────────── */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const top  = pos === 'tl' || pos === 'tr'
  const left = pos === 'tl' || pos === 'bl'
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

export default function ServicesPage() {
  const pageRef      = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const imgWrapRef   = useRef<HTMLDivElement>(null)
  const imgInnerRef  = useRef<HTMLDivElement>(null)
  const quoteRef     = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* ── Cover title SplitText reveal ───────────────────────────── */
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.15,
      })
    }

    /* ── Cover image clip-path reveal ───────────────────────────── */
    if (imgWrapRef.current) {
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power3.inOut', delay: 0.5 }
      )
    }

    /* ── Cover image parallax ────────────────────────────────────── */
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
        scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', once: true },
      })
    }

  }, { scope: pageRef })

  return (
    <>
      <Header />
      <main ref={pageRef} data-bg="light" style={{ background: 'var(--color-off-white)' }}>

        {/* ── 1. Cover ──────────────────────────────────────────────────── */}
        <div style={{ paddingBottom: 'calc(var(--margin) * 5)' }}>

          {/* Intro title — pushed right on md+ */}
          <div
            className="grid-w"
            style={{
              paddingTop:    'calc(var(--header-height) + var(--margin) * 7)',
              marginBottom:  'calc(var(--margin) * 4)',
            }}
          >
            <div className="col-span-full md:col-start-5 md:col-end-13">
              <h1
                ref={titleRef}
                className="body-36 md:body-48 lg:body-60"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.12 }}
              >
                We offer a complete and integrated service for{' '}
                <em>interior design,</em>{' '}
                <em>spatial planning,</em>{' '}
                <em>bespoke solutions,</em>{' '}
                and the{' '}
                <em>delivery of refined spaces.</em>
              </h1>
            </div>
          </div>

          {/* Full-width image — clip-path reveal + parallax */}
          <div style={{ paddingInline: 'var(--margin)', overflow: 'hidden' }}>
            <div
              ref={imgWrapRef}
              className="relative w-full overflow-hidden"
              style={{ paddingTop: '52%' }}
            >
              <div
                ref={imgInnerRef}
                style={{ position: 'absolute', inset: '-8% 0', height: '116%' }}
              >
                <Image
                  src="/projects/Villa-corso/studio 3.webp"
                  alt="Villa Corso,Italy — architecture and design services — Belvedere Properties, Italy"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* ── 2. Our Approach ───────────────────────────────────────────── */}
        <section
          className="relative"
          style={{
            paddingTop:    'calc(var(--margin) * 6)',
            paddingBottom: 'calc(var(--margin) * 6)',
            background:    'var(--color-off-white)',
          }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />

          {/* Large quote */}
          <div className="grid-w" style={{ marginBottom: 'calc(var(--margin) * 5)' }}>
            <div className="col-span-full md:col-span-10">
              <h2
                ref={quoteRef}
                className="body-36 md:body-48 lg:body-60"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.1 }}
              >
                &ldquo;Interior design is not simply decoration — it is the art of shaping environments where life is lived with beauty, comfort, and intention.&rdquo;
              </h2>
            </div>
          </div>

          {/* 01 label + body */}
          <div className="grid-w" style={{ marginBottom: 'calc(var(--margin) * 5)' }}>
            <div className="col-span-full md:col-span-3">
              <div className="flex gap-x-[2.4rem] uppercase body-14" style={{ color: 'var(--color-navy)' }}>
                <span style={{ opacity: 0.35 }}>01</span>
                <span>Our Approach</span>
              </div>
            </div>
            <div className="col-span-full md:col-start-7 md:col-end-13" style={{ marginTop: 'calc(var(--margin)*1.5)' }}>
              <p className="body-16 md:body-20" style={{ color: 'var(--color-navy)', opacity: 0.7, lineHeight: 1.85 }}>
                We work closely with private clients, investors, and project collaborators to deliver highly considered spaces. Our experience spans private residences, luxury villas, commercial interiors, hospitality environments, and investment development projects — every project receives our full attention.
              </p>
            </div>
          </div>

          {/* Two portrait images */}
          <div className="grid-w">
            <div className="col-span-full md:col-span-6 max-md:mb-[var(--gutter)]">
              <div className="relative w-full overflow-hidden" style={{ paddingTop: '105%' }}>
                <Image
                  src="/projects/My-Skin_bar/06.webp"
                  alt="Material craft and spatial detail — My Skin Bar, Italy — Belvedere Properties"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw,50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-span-full md:col-span-6">
              <div className="relative w-full overflow-hidden" style={{ paddingTop: '105%' }}>
                <Image
                  src="/projects/Via-bellini_1/03.webp"
                  alt="Interior design detail — Via Bellini apartment, Italy — Belvedere Properties"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw,50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Stack-cards: Services ──────────────────────────────────── */}
        <section style={{ background: 'var(--color-off-white)', paddingTop: 'calc(var(--margin) * 2)' }}>

          {/* Section header */}
          <div
            className="grid-w"
            style={{ paddingBottom: 'calc(var(--margin) * 4)' }}
          >
            <div className="col-span-full md:col-span-3">
              <div className="flex gap-x-[2.4rem] uppercase body-14" style={{ color: 'var(--color-navy)' }}>
                <span style={{ opacity: 0.35 }}>02</span>
                <span>Our Services</span>
              </div>
            </div>
            <div className="col-span-full md:col-start-5 md:col-end-10 max-md:mt-[2rem]">
              <h3
                className="body-36 md:body-48"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.08 }}
              >
                Three disciplines,<br />one vision.
              </h3>
            </div>
            <div className="col-span-full md:col-start-10 md:col-end-13 flex items-end max-md:mt-[2rem]">
              <p className="body-14" style={{ color: 'var(--color-navy)', opacity: 0.55, lineHeight: 1.8 }}>
                From initial analysis through to final handover — our services are complete, integrated, and designed for the delivery of exceptional spaces.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div>
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                style={{
                  position: 'sticky',
                  top:       `calc(var(--header-height) + ${i * 72}px)`,
                  zIndex:    10 + i,
                  background: i === 0
                    ? 'var(--color-off-white)'
                    : i === 1
                    ? '#ede9e3'
                    : '#e3ddd5',
                }}
              >
                {/* Hairline */}
                <div style={{
                  width: '100%', height: '1px',
                  background: 'var(--color-navy)', opacity: 0.12,
                }} />

                <div
                  className="grid-w"
                  style={{
                    paddingTop:    'calc(var(--margin) * 2.5)',
                    paddingBottom: 'calc(var(--margin) * 6)',
                    alignItems:    'start',
                  }}
                >
                  {/* Number + title — col 1–3 */}
                  <div className="col-span-full md:col-span-3 max-md:mb-[2.4rem]">
                    <div
                      className="body-12 uppercase"
                      style={{ color: 'var(--color-navy)', opacity: 0.35, letterSpacing: '0.15em', marginBottom: '1rem' }}
                    >
                      {svc.number}
                    </div>
                    <h4
                      className="body-24 md:body-36"
                      style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.1 }}
                    >
                      {svc.title}
                    </h4>
                  </div>

                  {/* Description — col 4–7, two paragraphs */}
                  <div
                    className="col-span-full md:col-start-4 md:col-end-8 flex flex-col max-md:mb-[2.4rem]"
                    style={{ gap: '1.8rem' }}
                  >
                    <p className="body-16" style={{ color: 'var(--color-navy)', opacity: 0.7, lineHeight: 1.85 }}>
                      {svc.col1}
                    </p>
                    <p className="body-16" style={{ color: 'var(--color-navy)', opacity: 0.7, lineHeight: 1.85 }}>
                      {svc.col2}
                    </p>
                  </div>

                  {/* Image — col 8–13 */}
                  <div className="col-span-full md:col-start-8 md:col-end-13 max-md:order-first max-md:mb-[2.4rem]">
                    <div className="relative w-full overflow-hidden" style={{ paddingTop: '72%' }}>
                      <Image
                        src={svc.image}
                        alt={`${svc.title} — Belvedere Properties studio work`}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px)100vw,45vw"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </section>

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
              Begin a project
            </p>
            <p
              className="body-20 md:body-24"
              style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, fontWeight: 600, maxWidth: '32rem' }}
            >
              Ready to discuss your project? We would love to hear from you.
            </p>
          </div>
          <div className="col-span-full md:col-start-9 md:col-end-13 flex items-center justify-end max-md:mt-[3rem]">
            <a
              href="/contact"
              className="body-12 uppercase"
              style={{
                display: 'inline-block',
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: '0.12em',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '2rem',
                padding: '1rem 2.8rem',
                textDecoration: 'none',
              }}
            >
              Get in touch&nbsp;→
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
