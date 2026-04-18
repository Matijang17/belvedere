'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero({ loaderDone }: { loaderDone: boolean }) {
  const sectionRef  = useRef<HTMLElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const bigTitleRef = useRef<HTMLDivElement>(null)
  const taglineRef  = useRef<HTMLHeadingElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!loaderDone) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {

      /* ── Image scale-in ──────────────────────────────────────────── */
      if (!reduced && imgRef.current) {
        gsap.from(imgRef.current, { scale: 1.06, duration: 1.6, ease: 'cubic.out' })
      }

      /* ── SplitText line reveal helper ───────────────────────────── */
      const revealEl = (el: HTMLElement | null, delay = 0) => {
        if (!el || reduced) return
        const split = new SplitText(el, { type: 'lines' })
        split.lines.forEach(line => {
          const wrap = document.createElement('div')
          wrap.style.overflow = 'hidden'
          line.parentNode?.insertBefore(wrap, line)
          wrap.appendChild(line)
        })
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay,
        })
      }

      /* Big title (top left) reveals first */
      revealEl(bigTitleRef.current, 0.15)
      /* Tagline (bottom right) reveals after */
      revealEl(taglineRef.current,  0.45)

      /* Scroll indicator fade in */
      if (!reduced && scrollRef.current) {
        gsap.from(scrollRef.current, {
          opacity: 0, y: 6, duration: 0.7, ease: 'power3.out', delay: 1.0,
        })
      }

      /* ── Parallax ────────────────────────────────────────────────── */
      if (!reduced && imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [loaderDone])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '56rem' }}
      data-bg="dark"
      aria-label="Hero"
    >
      {/* ── Full-screen background image with parallax container ───── */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full"
        style={{ height: '115%', top: '-7.5%' }}
      >
        <Image
          src="/projects/belgrade-waterfront/00 DNEVNA 1a.webp"
          alt="Luxury residential interior design — Belgrade Waterfront — Belvedere Properties"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Dark gradient overlay ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.62) 100%)',
        }}
      />

      {/* ── Big title — top left at 25vh (TC cover-home-title pattern) ──
          TC: body-48 md:body-72 xl:body-48 in xl:w-col-3 container      */}
      <div
        className="absolute left-0 right-0 grid-w pointer-events-none"
        style={{ top: '25vh' }}
      >
        <div className="col-span-full md:col-span-5 xl:col-span-3">
          <div
            ref={bigTitleRef}
            className="body-48 md:body-72 xl:body-48"
            style={{ color: '#ffffff', lineHeight: 1.1 }}
          >
            Interior<br />&amp; Design
          </div>
        </div>
      </div>

      {/* ── Small h1 tagline — bottom right (TC cover-home-content) ──
          TC: col-start-7 md → col-start-8 lg → col-start-10 xl, col-end-13
          TC font: body-16 md:body-20                                     */}
      <div
        className="absolute bottom-0 left-0 right-0 grid-w pointer-events-none"
        style={{ paddingBottom: 'calc(var(--margin)*2 + 3.2rem)' }}
      >
        <h1
          ref={taglineRef}
          className="col-span-full md:col-start-7 xl:col-start-10 md:col-end-13 body-16 md:body-20"
          style={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.65 }}
        >
          From concept to completion, every project is delivered with precision, discretion, and close attention to detail.
        </h1>
      </div>

      {/* ── Bottom bar: [Scroll] + location ──────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 grid-w"
        style={{ paddingBottom: 'var(--margin)' }}
      >
        {/* Scroll indicator — col-span-2, body-16, opacity ~0.52 (TC exact) */}
        <div ref={scrollRef} className="col-span-2 flex items-end">
          <span
            className="body-16"
            style={{ color: 'rgba(255,255,255,0.52)' }}
          >
            [Scroll]
          </span>
        </div>

        {/* Location */}
        <div className="col-span-4 md:col-span-10 flex items-end justify-end">
          <span
            className="body-12 uppercase"
            style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}
          >
            Morcote · Switzerland
          </span>
        </div>
      </div>
    </section>
  )
}
