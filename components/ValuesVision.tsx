'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    title: 'Design Integrity',
    desc:  'Our interiors are shaped through a considered process and a clear design brief — responding to client needs, spatial context, and everyday use. These elements are carefully developed into a singular and coherent design vision.',
    image: '/projects/Via-bellini_2/1 dnevna 2.webp',
  },
  {
    title: 'Spatial Precision',
    desc:  'Every project begins with a rigorous study of proportion, circulation, and light. We believe great interiors are defined by balance, clarity, and the seamless relationship between space and function.',
    image: '/projects/Cappucinni/3.webp',
  },
  {
    title: 'Refined Living',
    desc:  'From material selection to the smallest detail, every decision is guided by longevity, comfort, and beauty. We create environments that are functional, timeless, and designed to improve daily life.',
    image: '/projects/Villa-corso/master kop 2.webp',
  },
]

export default function ValuesVision() {
  /* sectionRef IS the pinned element — mirrors Vision.tsx pattern exactly */
  const sectionRef = useRef<HTMLElement>(null)
  const titleRefs  = useRef<(HTMLHeadingElement | null)[]>([])
  const descRefs   = useRef<(HTMLParagraphElement | null)[]>([])
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current || window.innerWidth < 1280) return

    /* Hide cards 1+ before first paint */
    for (let i = 1; i < ITEMS.length; i++) {
      gsap.set(titleRefs.current[i], { yPercent: 100 })
      gsap.set(descRefs.current[i],  { opacity: 0 })
      gsap.set(imgRefs.current[i],   { yPercent: 100 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:    sectionRef.current,
        pin:        true,
        pinSpacing: true,
        start:      'top top',
        end:        '+=350%',
        scrub:      1.5,
      },
    })

    /* ── Card 1 → 2 ── */
    tl.to(titleRefs.current[0], { yPercent: -110, ease: 'power2.inOut', duration: 0.4 }, 1.2)
    tl.to(descRefs.current[0],  { opacity: 0,     ease: 'power2.in',    duration: 0.3 }, 1.2)
    tl.to(imgRefs.current[0],   { yPercent: -18,  ease: 'none',         duration: 0.7 }, 1.0)
    tl.to(titleRefs.current[1], { yPercent: 0,    ease: 'power2.out',   duration: 0.4 }, 1.25)
    tl.to(descRefs.current[1],  { opacity: 1,     ease: 'power2.out',   duration: 0.4 }, 1.38)
    tl.to(imgRefs.current[1],   { yPercent: 0,    ease: 'power2.out',   duration: 0.5 }, 1.15)

    /* ── Card 2 → 3 ── */
    tl.to(titleRefs.current[1], { yPercent: -110, ease: 'power2.inOut', duration: 0.4 }, 2.2)
    tl.to(descRefs.current[1],  { opacity: 0,     ease: 'power2.in',    duration: 0.3 }, 2.2)
    tl.to(imgRefs.current[1],   { yPercent: -18,  ease: 'none',         duration: 0.7 }, 2.0)
    tl.to(titleRefs.current[2], { yPercent: 0,    ease: 'power2.out',   duration: 0.4 }, 2.25)
    tl.to(descRefs.current[2],  { opacity: 1,     ease: 'power2.out',   duration: 0.4 }, 2.38)
    tl.to(imgRefs.current[2],   { yPercent: 0,    ease: 'power2.out',   duration: 0.5 }, 2.15)

    tl.to({}, { duration: 0.5 }, 2.7)
  }, { scope: sectionRef })

  return (
    <>
      {/* ── Mobile: stacked cards ──────────────────────────────────────── */}
      <div className="xl:hidden" style={{ background: 'var(--color-off-white)' }} data-bg="light">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="grid-w"
            style={{
              paddingTop:    'calc(var(--margin) * 4)',
              paddingBottom: i === ITEMS.length - 1 ? 'calc(var(--margin) * 5)' : 'calc(var(--margin) * 4)',
              borderBottom:  i < ITEMS.length - 1 ? '1px solid rgba(11,29,61,0.1)' : undefined,
            }}
          >
            <div className="col-span-full">
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingTop: '66%', marginBottom: '2.4rem' }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
              <div
                className="body-12 uppercase"
                style={{ color: 'var(--color-navy)', opacity: 0.35, letterSpacing: '0.15em', marginBottom: '1.2rem' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3
                className="body-36"
                style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.6rem' }}
              >
                {item.title}
              </h3>
              <p
                className="body-16"
                style={{ color: 'var(--color-navy)', opacity: 0.65, lineHeight: 1.8, maxWidth: '48rem' }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── XL: GSAP-pinned cycling panel ─────────────────────────────── */}
      <section
        ref={sectionRef}
        className="max-xl:hidden relative overflow-hidden"
        style={{ height: '100vh', background: 'var(--color-off-white)' }}
        data-bg="light"
        aria-label="Our Vision"
      >
        {/* Index — bottom left */}
        <div style={{ position: 'absolute', bottom: 'var(--margin)', left: 'var(--margin)', zIndex: 3 }}>
          <span
            className="body-12 uppercase"
            style={{ color: 'var(--color-navy)', opacity: 0.35, letterSpacing: '0.15em' }}
          >
            02
          </span>
        </div>

        {/* Label — top right */}
        <div style={{ position: 'absolute', top: 'var(--margin)', right: 'var(--margin)', zIndex: 3 }}>
          <span
            className="body-12 uppercase"
            style={{ color: 'var(--color-navy)', opacity: 0.35, letterSpacing: '0.15em' }}
          >
            Our Vision
          </span>
        </div>

        {/* Grid */}
        <div className="grid-w h-full" style={{ position: 'relative', zIndex: 1 }}>

          {/* Left: cycling cards pinned to bottom */}
          <div
            className="col-span-7 flex items-end"
            style={{ paddingBottom: 'calc(var(--margin) * 4)' }}
          >
            {/*
              Card 0: position relative — sets the container height.
              Cards 1+: position absolute bottom 0 — stack in the same slot.
              Each h3 is inside overflow:hidden so yPercent:100 hides it below the clip.
            */}
            <div style={{ position: 'relative', width: '100%' }}>
              {ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    ...(i !== 0 && { bottom: 0, left: 0, width: '100%' }),
                  }}
                >
                  <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
                    <h3
                      ref={el => { titleRefs.current[i] = el }}
                      className="body-48 lg:body-60"
                      style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.05 }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    ref={el => { descRefs.current[i] = el }}
                    className="body-16"
                    style={{ color: 'var(--color-navy)', opacity: 0.65, lineHeight: 1.8, maxWidth: '36rem' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stacked images that slide in/out */}
          <div
            className="col-start-9 col-end-13 flex items-center"
            style={{ paddingTop: 'calc(var(--margin) * 2)', paddingBottom: 'calc(var(--margin) * 2)' }}
          >
            <div style={{ position: 'relative', width: '100%', paddingTop: '140%', overflow: 'hidden' }}>
              {ITEMS.map((item, i) => (
                <div
                  key={i}
                  ref={el => { imgRefs.current[i] = el }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="30vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
