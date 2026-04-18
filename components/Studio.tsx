'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Title: SplitText line-reveal on scroll */
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      split.lines.forEach(line => {
        const wrap = document.createElement('div')
        wrap.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
      })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%', once: true },
      })
    }
  }, { scope: sectionRef })

  return (
    /*
     * TC: <c-about class="about relative grid-w pt-margin max-xl:mb-100 xl:pb-margin">
     * The section itself IS the grid — children are direct grid items.
     */
    <section
      ref={sectionRef}
      className="relative grid-w"
      style={{
        paddingTop:    'var(--margin)',
        paddingBottom: 'var(--margin)',
        background:    'var(--color-off-white)',
      }}
      data-bg="light"
      aria-labelledby="studio-h"
    >

      {/* ── TC corner marks — top-left and top-right only ────────────── */}
      {/* Top-left: horizontal line on bottom, vertical line on right */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0,
        width: '2rem', height: '2rem',
      }}>
        <div style={{ position: 'absolute', left: '0.4rem', bottom: 0, width: '1.2rem', height: '1px', background: 'var(--color-navy)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', right: 0, top: '0.4rem', width: '1px', height: '1.2rem', background: 'var(--color-navy)', opacity: 0.3 }} />
      </div>
      {/* Top-right: horizontal line on bottom, vertical line on left */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: 0, top: 0,
        width: '2rem', height: '2rem',
      }}>
        <div style={{ position: 'absolute', right: '0.4rem', bottom: 0, width: '1.2rem', height: '1px', background: 'var(--color-navy)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', left: 0, top: '0.4rem', width: '1px', height: '1.2rem', background: 'var(--color-navy)', opacity: 0.3 }} />
      </div>

      {/*
       * ── Image column ───────────────────────────────────────────────
       * TC: col-span-full md:col-span-3 xl:col-span-2
       *
       * Sticky trick (TC pattern):
       *   1. Outer placeholder  — sets the column height via pt-[120%]
       *   2. Absolute tall div  — extends 25rem below so sticky has room to scroll
       *   3. Sticky inner div   — stays fixed relative to viewport while column scrolls
       */}
      <div
        className="col-span-full md:col-span-3 xl:col-span-2"
        style={{ marginBottom: '5.2rem' }}
      >
        {/* 1. Height placeholder */}
        <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '120%' }}>
          {/* 2. Tall absolute container — gives sticky room to travel */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: 'calc(100% + 25rem)',
          }}>
            {/* 3. Sticky image — stays pinned while the tall container scrolls */}
            <div
              className="relative md:sticky"
              style={{
                top: '6.2rem',   /* TC: top-62 @ 10px base */
                width: '100%', height: 0, paddingTop: '120%',
              }}
            >
              <div style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src="/projects/Casino/Casino_laos_4.webp"
                  alt="Belvedere Properties project — Casino interior, Laos"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw,30vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
       * ── Label + description text ────────────────────────────────────
       * TC: col-span-full md:col-start-5 xl:col-start-7 md:col-end-11
       *     max-md:order-first   flex flex-col justify-between
       */}
      <div
        className="col-span-full md:col-start-5 xl:col-start-7 md:col-end-11 max-md:order-first flex flex-col justify-between"
        style={{ marginBottom: '5.2rem', gap: '3.6rem' }}
      >
        <span
          className="body-12 uppercase"
          style={{ color: 'var(--color-navy)', opacity: 0.4, letterSpacing: '0.2em' }}
        >
          01&nbsp;&nbsp;Studio
        </span>

        <p
          className="body-16"
          style={{ color: 'var(--color-navy)', opacity: 0.7, lineHeight: 1.85 }}
        >
          Belvedere Properties SA is a Lugano-based interior design and property development studio specialising in spatial transformation, bespoke interiors, and the enhancement of high-value properties.
          We guide each project through every phase, integrating strategic vision, technical expertise, and hands-on project management.
        </p>
      </div>

      {/*
       * ── Big offset title ────────────────────────────────────────────
       * TC: col-span-full  with inline spacer + inline h2
       *   <span class="inline-block md:w-col-4 xl:w-col-offset-3 max-md:hidden" />
       *   <h2 class="offset-title inline body-36 md:body-48 lg:body-60 xl:body-72">
       *
       * The spacer pushes the title to start at roughly col 4 on md, col 4 on xl.
       * Width: 3/12 of content area ≈ 25% minus gutter adjustments.
       */}
      <div
        className="col-span-full"
        style={{ marginTop: 'calc(var(--margin) * 8)', marginBottom: 'calc(var(--margin) * 4)' }}
      >
        {/* Invisible spacer — hidden on mobile */}
        <span
          className="max-md:hidden"
          style={{ display: 'inline-block', width: 'calc(25% - 0.75 * var(--gutter))' }}
        />
        <h2
          ref={titleRef}
          id="studio-h"
          className="body-36 md:body-48 xl:body-72"
          style={{
            display: 'inline',
            color: 'var(--color-navy)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Our objective is to create elegant, coherent, and timeless spaces that combine aesthetic quality with long-term value.
        </h2>
      </div>

      {/*
       * ── Bottom row ──────────────────────────────────────────────────
       * TC left:  col-start-1 md:col-end-4 xl:col-start-4 xl:col-end-6
       * TC right: col-start-5 xl:col-start-7 md:col-end-11 xl:pb-150
       */}

      {/* Left: discipline labels */}
      <div
        className="col-span-full md:col-start-1 md:col-end-4 xl:col-start-4 xl:col-end-6 body-16 max-md:mb-[3.2rem]"
        style={{ color: 'var(--color-navy)', opacity: 0.55, lineHeight: 1.8 }}
      >
        Interior Design
      </div>

      {/* Right: description + CTA */}
      <div
        className="col-span-full md:col-start-5 xl:col-start-7 md:col-end-11"
        style={{ paddingBottom: 'calc(var(--margin) * 8)' }}
      >
        <p
          className="body-16"
          style={{ color: 'var(--color-navy)', opacity: 0.65, lineHeight: 1.85, marginBottom: '2.8rem' }}
        >
          Through a trusted network of craftsmen, manufacturers, and specialist partners, we ensure exceptional standards at every stage.
        </p>
        <Link
          href="/studio"
          className="link-underline body-14 uppercase"
          style={{ color: 'var(--color-navy)', letterSpacing: '0.12em' }}
        >
          Studio&nbsp;/&nbsp;Discover&nbsp;→
        </Link>
      </div>

    </section>
  )
}
