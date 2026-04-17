'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkItem({
  p,
  headingAs = 'h3',
}: {
  p: Project
  /** Use h2 on the portfolio page (only list of items), h3 on the homepage section */
  headingAs?: 'h2' | 'h3'
}) {
  const itemRef         = useRef<HTMLDivElement>(null)
  const bracketLRef     = useRef<HTMLDivElement>(null)
  const bracketRRef     = useRef<HTMLDivElement>(null)
  const titleRef        = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef        = useRef<HTMLDivElement>(null)
  const imgInnerRef     = useRef<HTMLDivElement>(null)
  const categoryRef     = useRef<HTMLSpanElement>(null)
  const dateRef         = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.set(
      [bracketLRef.current, bracketRRef.current, titleRef.current, imageWrapperRef.current],
      { clearProps: 'all' }
    )
    gsap.set([imageRef.current, imgInnerRef.current], { clearProps: 'transform,scale' })

    /* Enter: bottom → 10% from top */
    const enterTl = gsap.timeline({ defaults: { ease: 'none' } })
    enterTl
      .fromTo(bracketLRef.current,  { xPercent: 0 },              { xPercent: -90 },           0)
      .fromTo(bracketRRef.current,  { xPercent: 0 },              { xPercent:  90 },           0)
      .fromTo(titleRef.current,     { letterSpacing: 0 },         { letterSpacing: '0.04em' }, 0)
      .fromTo(imgInnerRef.current,  { scale: 1.75 },              { scale: 1 },                0)
      .fromTo(imageRef.current,     { scale: 0.55 },              { scale: 1 },                0)

    ScrollTrigger.create({
      trigger: itemRef.current, start: 'top bottom', end: 'top 10%',
      scrub: 0.6, animation: enterTl,
    })

    /* Leave: scroll off the top */
    const leaveTl = gsap.timeline({ defaults: { ease: 'none' } })
    leaveTl
      .fromTo(bracketLRef.current,     { xPercent: -90 },           { xPercent: 0 },          0)
      .fromTo(bracketRRef.current,     { xPercent:  90 },           { xPercent: 0 },          0)
      .fromTo(titleRef.current,        { letterSpacing: '0.04em' }, { letterSpacing: 0 },     0)
      .fromTo(imgInnerRef.current,     { scale: 1 },                { scale: 1.75 },          0)
      .fromTo(imageRef.current,        { scale: 1 },                { scale: 0.3 },           0)
      .fromTo(imageWrapperRef.current, { yPercent: 0 },             { yPercent: -35 },        0)

    ScrollTrigger.create({
      trigger: itemRef.current, start: 'top top', end: 'bottom top',
      scrub: 0.6, animation: leaveTl,
      onEnter: () => {
        gsap.killTweensOf([categoryRef.current, dateRef.current])
        gsap.to([categoryRef.current, dateRef.current], { yPercent: -100, duration: 0.8, ease: 'expo.out' })
      },
      onLeaveBack: () => {
        gsap.killTweensOf([categoryRef.current, dateRef.current])
        gsap.fromTo(
          [categoryRef.current, dateRef.current],
          { yPercent: 100 }, { yPercent: 0, duration: 1.1, ease: 'expo.out' }
        )
      },
    })
  }, { scope: itemRef })

  const Title = headingAs

  return (
    <div
      ref={itemRef}
      className="works-item w-full"
      data-bg="light"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBlock: 'calc(var(--margin) * 3)',
      }}
    >
      <Link href={`/portfolio/${p.slug}`} className="block w-full" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>

          {/* ── Title row: [ bracket · title · bracket ] ──────────── */}
          <div
            className="body-48 md:body-72 xl:body-100"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              paddingInline: 'var(--margin)',
              lineHeight: 1,
            }}
          >
            <div aria-hidden="true" style={{
              position: 'absolute', top: '50%', left: 'var(--margin)',
              width: '3rem', height: '1px',
              background: 'var(--color-navy)', opacity: 0.12,
              transform: 'translateY(-0.6em)', pointerEvents: 'none',
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute', top: '50%', right: 'var(--margin)',
              width: '3rem', height: '1px',
              background: 'var(--color-navy)', opacity: 0.12,
              transform: 'translateY(-0.6em)', pointerEvents: 'none',
            }} />

            <div ref={bracketLRef} aria-hidden="true" style={{
              flex: 1, display: 'flex', justifyContent: 'flex-end',
              color: 'var(--color-navy)', lineHeight: 'inherit', fontWeight: 300,
            }}>[</div>

            <Title
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              style={{
                flex: '0 1 auto',
                color: 'var(--color-navy)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              {p.title}
            </Title>

            <div ref={bracketRRef} aria-hidden="true" style={{
              flex: 1,
              color: 'var(--color-navy)',
              lineHeight: 'inherit',
              fontWeight: 300,
            }}>]</div>
          </div>

          {/* ── Image + metadata ──────────────────────────────────── */}
          <div ref={imageWrapperRef} className="grid-w" style={{ marginTop: '-2rem' }}>
            <div className="col-span-full md:col-start-3 md:col-end-11 xl:col-start-4 xl:col-end-10">

              <div
                ref={imageRef}
                className="w-full overflow-hidden"
                style={{ position: 'relative', paddingTop: '66%' }}
              >
                <div
                  ref={imgInnerRef}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} — ${p.category}, ${p.location} — Belvedere Properties`}
                    width={1200}
                    height={800}
                    className="object-cover"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    loading="lazy"
                    sizes="(max-width:768px)100vw,(max-width:1280px)75vw,55vw"
                  />
                </div>
              </div>

              {/* Category · Discover · Year */}
              <div style={{
                marginTop: '1.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <span
                    ref={categoryRef}
                    className="body-12 uppercase"
                    style={{ display: 'block', color: 'var(--color-navy)', opacity: 0.55, letterSpacing: '0.1em' }}
                  >
                    {p.category}
                  </span>
                </div>

                <span
                  className="body-12 uppercase"
                  style={{
                    color: 'var(--color-navy)',
                    letterSpacing: '0.08em',
                    border: '1px solid rgba(11,29,61,0.2)',
                    borderRadius: '2rem',
                    padding: '0.5rem 1.4rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  Discover&nbsp;→
                </span>

                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <span
                    ref={dateRef}
                    className="body-12"
                    style={{ display: 'block', color: 'var(--color-navy)', opacity: 0.55, textAlign: 'right' }}
                  >
                    {p.year}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Link>
    </div>
  )
}
