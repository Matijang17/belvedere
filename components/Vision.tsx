'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    id: 1,
    title: 'Design Integrity',
    desc: 'Our aesthetic is established through a careful process and a detailed concept brief — considering client needs, site context, and future occupiers. We combine and test these elements to create a singular design vision concealing many architectural layers.',
  },
  {
    id: 2,
    title: 'Spatial precision',
    desc: 'Every project begins with a rigorous study of program, proportion, and light. Architecture\'s power lies in its ability to choreograph human experience through carefully resolved space and material craft.',
  },
  {
    id: 3,
    title: 'Refined living',
    desc: 'From material selection to the smallest detail, every decision is guided by a commitment to longevity and beauty. We design environments that are functional and deeply considered — spaces that improve over time.',
  },
]

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const bgWrapRef  = useRef<HTMLDivElement>(null)   /* clip-path expansion */
  const bgImgRef   = useRef<HTMLDivElement>(null)   /* image scale-back    */
  const overlayRef = useRef<HTMLDivElement>(null)   /* overlay fade-in     */

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !trackRef.current || !sectionRef.current) return

    /* ── Zoom-in entrance: gallery photo expands to fill the section ── */
    const zoomTrigger = {
      trigger: sectionRef.current,
      start:   'top 90%',   /* begin when section is 90% down in viewport */
      end:     'top top',   /* complete when section pins at top           */
      scrub:   1.4,
    }

    /* Clip-path: small inset card → full bleed */
    gsap.fromTo(bgWrapRef.current,
      { clipPath: 'inset(28% 18% round 10px)' },
      { clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: zoomTrigger }
    )

    /* Image scale: starts zoomed in (texture fill), settles to normal */
    gsap.fromTo(bgImgRef.current,
      { scale: 1.8 },
      { scale: 1,   ease: 'none', scrollTrigger: zoomTrigger }
    )

    /* Overlay: fades in as photo expands */
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, ease: 'none', scrollTrigger: { ...zoomTrigger, scrub: 1 } }
    )

    /* ── Horizontal scroll: track slides left while section is pinned ── */
    gsap.to(trackRef.current, {
      xPercent: -(100 * (ITEMS.length - 1) / ITEMS.length),
      ease: 'none',
      scrollTrigger: {
        trigger:    sectionRef.current,
        pin:        true,
        pinSpacing: true,
        start:      'top top',
        end:        '+=250%',
        scrub:      1,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}
      data-bg="dark"
      aria-labelledby="vision-h"
    >
      {/* ── Background: same exterior photo as gallery, zooms in on entry ── */}
      <div
        ref={bgWrapRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        {/* Scale wrapper — oversized inset so edges never show during scale */}
        <div
          ref={bgImgRef}
          style={{ position: 'absolute', inset: '-25%' }}
        >
          <Image
            src="/projects/Eda-center/Enscape_2022-12-19-15-34-57.webp"
            alt="Eda Center architectural render — Belvedere Properties, Slovenia"
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        {/* Dark overlay — fades in with the zoom */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%)',
          }}
        />
      </div>

      {/* ── Bottom-left: section index ───────────────────────────────── */}
      <div
        className="absolute body-12 uppercase"
        style={{
          bottom: 'var(--margin)', left: 'var(--margin)',
          color: 'rgba(255,255,255,0.52)', letterSpacing: '0.15em', zIndex: 3,
        }}
      >
        03
      </div>

      {/* ── Top-right: section name ───────────────────────────────────── */}
      <div
        className="absolute body-12 uppercase"
        style={{
          top: 'var(--margin)', right: 'var(--margin)',
          color: 'rgba(255,255,255,0.52)', letterSpacing: '0.15em', zIndex: 3,
        }}
      >
        Vision
      </div>

      {/* ── Horizontal text track (300vw wide, slides left on scroll) ─── */}
      <div
        ref={trackRef}
        style={{
          position:  'absolute',
          top:       0,
          left:      0,
          width:     `${ITEMS.length * 100}vw`,
          height:    '100%',
          display:   'flex',
          willChange: 'transform',
          zIndex:    2,
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            style={{
              width:    '100vw',
              height:   '100%',
              flexShrink: 0,
              position: 'relative',
              paddingInline: 'var(--margin)',
            }}
          >
            {/* ── Large horizontal title — vertically centred ── */}
            <h2
              id={i === 0 ? 'vision-h' : undefined}
              style={{
                position:     'absolute',
                top:          '50%',
                left:         'var(--margin)',
                transform:    'translateY(-50%)',
                fontSize:     'clamp(5rem, 9.5vw, 13rem)',
                fontWeight:   700,
                color:        '#ffffff',
                lineHeight:   1,
                letterSpacing: '-0.02em',
                whiteSpace:   'nowrap',
                pointerEvents: 'none',
              }}
            >
              {item.title}
            </h2>

            {/* ── Description — center-right of each 100vw slot ── */}
            <p
              className="body-14"
              style={{
                position:  'absolute',
                top:       '56%',
                right:     'var(--margin)',
                maxWidth:  '30rem',
                color:     'rgba(255,255,255,0.68)',
                lineHeight: 1.85,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom-center: CTA button ─────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          bottom:    'var(--margin)',
          left:      '50%',
          transform: 'translateX(-50%)',
          zIndex:    3,
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          href="/studio"
          className="body-12 uppercase vision-btn"
          style={{
            display:       'inline-block',
            color:         'rgba(255,255,255,0.75)',
            letterSpacing: '0.12em',
            border:        '1px solid rgba(255,255,255,0.25)',
            borderRadius:  '2rem',
            padding:       '0.9rem 2.4rem',
          }}
        >
          Vision&nbsp;·&nbsp;Discover&nbsp;+
        </Link>
      </div>
    </section>
  )
}
