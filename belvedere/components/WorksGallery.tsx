'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   Desktop floating images — wide positions, smaller % widths
   ───────────────────────────────────────────────────────────────────────────── */
const DESKTOP_IMGS = [
  /* Left cluster */
  { id: 1, p: PROJECTS[0], pos: { left: '3%',   top: '7%'     }, imgW: '19%', speed: 18, w: 600, h: 800 },
  { id: 2, p: PROJECTS[1], pos: { left: '-4%',  top: '47%'    }, imgW: '17%', speed: 10, w: 800, h: 600 },
  { id: 3, p: PROJECTS[2], pos: { left: '11%',  bottom: '7%'  }, imgW: '21%', speed: 23, w: 900, h: 600 },
  /* Middle cluster — smaller, tighter, don't crowd the title */
  { id: 7, p: PROJECTS[3], pos: { left: '27%',  top: '4%'     }, imgW: '11%', speed: 16, w: 900, h: 600 },
  { id: 8, p: PROJECTS[4], pos: { right: '26%', bottom: '5%'  }, imgW: '10%', speed: 21, w: 600, h: 800 },
  { id: 9, p: PROJECTS[5], pos: { left: '30%',  bottom: '12%' }, imgW: '10%', speed: 13, w: 900, h: 600 },
  /* Right cluster */
  { id: 4, p: PROJECTS[6], pos: { right: '3%',  top: '4%'     }, imgW: '23%', speed: 14, w: 900, h: 600 },
  { id: 5, p: PROJECTS[7], pos: { right: '15%', top: '34%'    }, imgW: '13%', speed: 20, w: 533, h: 800 },
  { id: 6, p: PROJECTS[8], pos: { right: '-3%', bottom: '9%'  }, imgW: '19%', speed: 12, w: 600, h: 800 },
]

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile floating images — portrait-optimised positions, larger % widths
   Mirrors the Telha Clarke mobile reference: scattered around the viewport
   ───────────────────────────────────────────────────────────────────────────── */
const MOBILE_IMGS = [
  { id: 1, p: PROJECTS[0], pos: { left: '1%',   top: '4%'     }, imgW: '31%', speed: 12, w: 600, h: 800 },
  { id: 2, p: PROJECTS[1], pos: { right: '-1%', top: '2%'     }, imgW: '34%', speed: 8,  w: 800, h: 600 },
  { id: 3, p: PROJECTS[2], pos: { left: '-2%',  top: '40%'    }, imgW: '27%', speed: 16, w: 900, h: 600 },
  { id: 4, p: PROJECTS[3], pos: { left: '37%',  top: '14%'    }, imgW: '21%', speed: 11, w: 600, h: 800 },
  { id: 5, p: PROJECTS[4], pos: { right: '4%',  top: '44%'    }, imgW: '29%', speed: 19, w: 533, h: 800 },
  { id: 6, p: PROJECTS[5], pos: { right: '27%', top: '57%'    }, imgW: '19%', speed: 15, w: 900, h: 600 },
  { id: 7, p: PROJECTS[6], pos: { left: '3%',   bottom: '9%'  }, imgW: '33%', speed: 13, w: 900, h: 600 },
  { id: 8, p: PROJECTS[7], pos: { right: '-1%', bottom: '7%'  }, imgW: '35%', speed: 9,  w: 600, h: 800 },
  { id: 9, p: PROJECTS[8], pos: { left: '31%',  bottom: '4%'  }, imgW: '22%', speed: 20, w: 800, h: 600 },
]

export default function WorksGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const btnRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Entrance + per-image parallax — targets all [data-gimg] in section */
    const items = gsap.utils.toArray<HTMLElement>('[data-gimg]', sectionRef.current)

    gsap.from(items, {
      opacity: 0, scale: 0.92, stagger: 0.09, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })

    items.forEach(el => {
      const speed = parseFloat(el.dataset.speed ?? '15')
      gsap.to(el, {
        yPercent: -speed, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1,
        },
      })
    })

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        yPercent: -6, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2,
        },
      })
    }

    if (btnRef.current) {
      gsap.to(btnRef.current, {
        yPercent: -14, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.4,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', background: 'var(--color-white)' }}
      data-bg="light"
      aria-label="All works"
    >

      {/* ── Mobile floating images (< md) ─────────────────────────────── */}
      {MOBILE_IMGS.map(img => (
        <Link
          key={`m-${img.id}`}
          href={`/portfolio/${img.p.slug}`}
          data-gimg
          data-speed={img.speed}
          className="md:hidden"
          style={{ position: 'absolute', width: img.imgW, zIndex: 1, ...img.pos }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="overflow-hidden">
            <Image
              src={img.p.image}
              alt={img.p.title}
              width={img.w}
              height={img.h}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              className="gallery-img"
              loading="lazy"
              sizes="35vw"
            />
          </div>
        </Link>
      ))}

      {/* ── Desktop floating images (md+) ─────────────────────────────── */}
      {DESKTOP_IMGS.map(img => (
        <Link
          key={`d-${img.id}`}
          href={`/portfolio/${img.p.slug}`}
          data-gimg
          data-speed={img.speed}
          className="hidden md:block gallery-img-link"
          style={{ position: 'absolute', width: img.imgW, zIndex: 1, ...img.pos }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="overflow-hidden gallery-img-link">
            <Image
              src={img.p.image}
              alt={img.p.title}
              width={img.w}
              height={img.h}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              className="gallery-img"
              loading="lazy"
              sizes="22vw"
            />
          </div>
        </Link>
      ))}

      {/* ── Center: title ─────────────────────────────────────────────── */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          className="body-48 md:body-60 xl:body-72"
          style={{ color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1 }}
        >
          All Work
          <sup style={{
            fontSize: '0.32em', verticalAlign: 'top',
            marginLeft: '0.3em', color: 'var(--color-champagne)',
            fontWeight: 400, lineHeight: 1.6,
          }}>
            ({PROJECTS.length})
          </sup>
        </div>
      </div>

      {/* ── Center: CTA button ────────────────────────────────────────── */}
      <div
        ref={btnRef}
        style={{
          position: 'absolute',
          top: 'calc(50% + 6rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          href="/portfolio"
          className="body-12 uppercase gallery-btn"
          style={{
            display: 'inline-block',
            color: 'var(--color-navy)',
            letterSpacing: '0.12em',
            border: '1px solid rgba(11,29,61,0.22)',
            borderRadius: '2rem',
            padding: '0.9rem 2.8rem',
          }}
        >
          All Work&nbsp;·&nbsp;Discover&nbsp;+
        </Link>
      </div>

    </section>
  )
}
