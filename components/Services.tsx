'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const SERVICES = [
  {
    id: 1, num: '01',
    en: 'Interior Design',
    si: 'Notranje oblikovanje',
    desc: 'Interior design transcends practical space planning. It is the art of aesthetic perception, with an emphasis on originality, innovation, and personal style.',
    img: '/projects/Via-bellini_1/06.webp',
    alt: 'Interior design — Via Bellini apartment, Italy — Belvedere Properties',
  },
  {
    id: 2, num: '02',
    en: 'Carpentry Services',
    si: 'Mizarske storitve',
    desc: 'With craftsmanship and thoughtful design, we cultivate an inner dialogue with nature, where every detail radiates the unique charm of wood.',
    img: '/projects/Casino/Casino_laos_2.webp',
    alt: 'Bespoke carpentry and joinery — Casino interior, Laos — Belvedere Properties',
  },
  {
    id: 3, num: '03',
    en: 'Construction Works',
    si: 'Gradbena dela',
    desc: 'We engage in projects of varying complexity, from minor repairs to extensive renovations and new constructions, building sustainable solutions.',
    img: '/projects/Eda-center/13.webp',
    alt: 'Construction works — Eda Center, Slovenia — Belvedere Properties',
  },
  {
    id: 4, num: '04',
    en: 'Project Management',
    si: 'Celostno vodenje projektov',
    desc: 'We leave nothing to chance. Only a comprehensively managed project can reach its full potential — we are with you from idea to execution.',
    img: '/projects/belgrade-waterfront/01 DNEVNA 2 a.webp',
    alt: 'Project management — Belgrade Waterfront development, Serbia — Belvedere Properties',
  },
]

function ServiceItem({ s, idx }: { s: typeof SERVICES[0]; idx: number }) {
  const rowRef   = useRef<HTMLDivElement>(null)
  const imgRef   = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.from(imgRef.current, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.1,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
    })

    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      split.lines.forEach(l => {
        const w = document.createElement('div')
        w.style.overflow = 'hidden'
        l.parentNode?.insertBefore(w, l)
        w.appendChild(l)
      })
      gsap.from(split.lines, {
        yPercent: 110, duration: 0.9, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
      })
    }
  }, { scope: rowRef })

  const isReversed = idx % 2 === 1

  const imageCol = (
    <div className="col-span-full md:col-span-6 overflow-hidden" ref={imgRef}>
      <div className="relative w-full" style={{ paddingTop: '75%' }}>
        <Image
          src={s.img} alt={s.alt} fill
          className="object-cover"
          sizes="(max-width:768px)100vw,50vw"
          loading="lazy"
        />
      </div>
    </div>
  )

  const textCol = (
    <div
      className="col-span-full md:col-span-6 flex flex-col justify-center"
      style={{ padding: 'var(--margin)' }}
    >
      <span
        className="body-12 uppercase"
        style={{ color: 'var(--color-champagne)', letterSpacing: '0.2em', marginBottom: '0.8rem' }}
      >
        {s.num} — {s.si}
      </span>
      <h3
        ref={titleRef}
        className="body-36 md:body-48"
        style={{ color: 'var(--color-navy)', marginBottom: '2.4rem', letterSpacing: '-0.01em' }}
      >
        {s.en}
      </h3>
      <p
        className="body-16"
        style={{ color: 'var(--color-navy)', opacity: 0.6, maxWidth: '48rem', lineHeight: 1.8, marginBottom: '3.2rem' }}
      >
        {s.desc}
      </p>
      <Link
        href="/services"
        className="link-underline self-start body-14 uppercase"
        style={{ letterSpacing: '0.1em', color: 'var(--color-navy)' }}
      >
        More Information →
      </Link>
    </div>
  )

  return (
    <div
      ref={rowRef}
      className="grid-w"
      style={{ borderTop: '1px solid rgba(11,29,61,0.1)', paddingTop: 0, paddingBottom: 0 }}
    >
      {isReversed ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
    </div>
  )
}

export default function Services() {
  return (
    <section
      style={{ background: 'var(--color-white)' }}
      data-bg="light"
      aria-labelledby="services-h"
    >
      {/* Section label */}
      <div
        className="grid-w"
        style={{ paddingTop: 'calc(var(--margin)*6)', paddingBottom: 'calc(var(--margin)*4)' }}
      >
        <div className="col-span-full flex items-center" style={{ gap: '1.2rem' }}>
          <h2
            id="services-h"
            className="body-12 uppercase"
            style={{ letterSpacing: '0.25em', color: 'var(--color-navy)' }}
          >
            Our Services
          </h2>
          <div style={{ width: '6rem', height: '1px', background: 'var(--color-champagne)' }} />
        </div>
      </div>

      {SERVICES.map((s, i) => <ServiceItem key={s.id} s={s} idx={i} />)}
    </section>
  )
}
