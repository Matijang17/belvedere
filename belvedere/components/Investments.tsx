'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Investments() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* parallax */
    if (!reduced && imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    }

    /* headline word reveal */
    if (titleRef.current && !reduced) {
      const split = new SplitText(titleRef.current, { type: 'words,lines' })
      split.lines.forEach(l => {
        const w = document.createElement('div'); w.style.overflow = 'hidden'
        l.parentNode?.insertBefore(w, l); w.appendChild(l)
      })
      gsap.from(split.words, {
        yPercent: 110, duration: 0.9, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }

    if (!reduced && bodyRef.current) {
      gsap.from(bodyRef.current, {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%', once: true },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '80vh' }}
      data-bg="dark"
      aria-labelledby="inv-h"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 w-full" style={{ height: '130%', top: '-15%' }}>
        <Image
          src="/projects/Eda-center/3.webp"
          alt="Eda Center commercial development — Belvedere Properties, Slovenia"
          fill className="object-cover object-center" sizes="100vw" loading="lazy"
        />
      </div>

      {/* Navy overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(11,29,61,0.72)' }} />

      {/* Content */}
      <div className="relative z-10 grid-w w-full" style={{ paddingTop: 'calc(var(--margin)*8)', paddingBottom: 'calc(var(--margin)*8)' }}>
        <div className="col-span-full md:col-span-10 md:col-start-2 flex flex-col items-center text-center">
          <span id="inv-h" className="body-12 uppercase mb-16" style={{ color: '#c8ab86', letterSpacing: '0.2em' }}>
            Investicije&nbsp;/&nbsp;Investments
          </span>
          <h2
            ref={titleRef}
            className="body-60 md:body-72"
            style={{ color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '3.2rem' }}
          >
            Where others see decay,<br />we recognize potential.
          </h2>
          <p
            ref={bodyRef}
            className="body-16"
            style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '56rem', lineHeight: 1.9 }}
          >
            From hidden opportunities and challenges, we create unique spatial
            solutions that reflect our commitment to aesthetics and functionality.
            With passion for detail and careful planning, we create spaces where
            beauty and function form a harmonious whole.
          </p>
        </div>
      </div>
    </section>
  )
}
