'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

/* ── Live clock (Zurich time) ──────────────────────────────────────────── */
function LiveClock() {
  const hourRef   = useRef<HTMLSpanElement>(null)
  const minRef    = useRef<HTMLSpanElement>(null)
  const ampmRef   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const update = () => {
      const d = new Date()
      const opts: Intl.DateTimeFormatOptions = {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Europe/Zurich',
      }
      const parts = new Intl.DateTimeFormat('en-CH', opts).formatToParts(d)
      if (hourRef.current)  hourRef.current.textContent  = parts.find(p => p.type === 'hour')?.value   ?? ''
      if (minRef.current)   minRef.current.textContent   = parts.find(p => p.type === 'minute')?.value ?? ''
      if (ampmRef.current)  ampmRef.current.textContent  = parts.find(p => p.type === 'dayPeriod')?.value ?? ''
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="flex gap-x-1 uppercase body-12" style={{ opacity: 0.45, letterSpacing: '0.06em' }}>
      <span ref={hourRef} />
      <span>:</span>
      <span ref={minRef} />
      <span ref={ampmRef} className="ml-1" />
    </span>
  )
}

const NAV = [
  { label: 'Work',    href: '/portfolio', comma: true  },
  { label: 'Process', href: '/services',  comma: true  },
  { label: 'Studio',  href: '/studio',    comma: false },
]

export default function Header() {
  const headerRef  = useRef<HTMLElement>(null)
  const menuRef    = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [isDark,   setIsDark]       = useState(true)  /* hero is dark — start white */
  const [mounted,  setMounted]      = useState(false)
  const togglerRef = useRef<HTMLDivElement>(null)
  const closeRef   = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  /* ── Init menu off-screen (GSAP owns transform, no React style conflict) ── */
  useEffect(() => {
    if (menuRef.current) gsap.set(menuRef.current, { xPercent: 100 })
  }, [])

  /* ── bg detection ────────────────────────────────────────────────── */
  const checkBg = useCallback(() => {
    const y = window.scrollY + 30
    let dark = false
    document.querySelectorAll<HTMLElement>('[data-bg]').forEach(el => {
      const top = el.getBoundingClientRect().top + window.scrollY
      if (y >= top && y < top + el.offsetHeight) {
        dark = el.dataset.bg === 'dark'
      }
    })
    setIsDark(dark)
  }, [])

  useEffect(() => {
    checkBg()
    window.addEventListener('scroll', checkBg, { passive: true })
    return () => window.removeEventListener('scroll', checkBg)
  }, [checkBg])

  /* ── mobile menu open/close ─────────────────────────────────────── */
  const openMenu = useCallback(() => {
    setMenuOpen(true)
    gsap.fromTo(menuRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: 'power3.inOut' })
    gsap.to(overlayRef.current, { opacity: 0.4, duration: 0.4 })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeMenu = useCallback(() => {
    gsap.to(menuRef.current,    { xPercent: 100, duration: 0.6, ease: 'power3.inOut', onComplete: () => setMenuOpen(false) })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 })
    document.body.style.overflow = ''
  }, [])

  const textCol = isDark ? '#ffffff' : '#0b1d3d'

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 left-0 grid-w w-full z-10"
        style={{
          height: 'var(--header-height)',
          alignContent: 'center',
          color: textCol,
          transition: `color var(--dur-normal) var(--ease-out)`,
        }}
        aria-label="Site header"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <div className="col-span-3 md:col-span-2 flex items-center">
          <Link href="/" aria-label="Belvedere Properties SA — home">
            <Image
              src="/BELVEDERE_PROPERTIES_LOGO_RGB.png"
              alt="Belvedere Properties SA"
              width={180}
              height={60}
              priority
              style={{
                width: '10rem',
                height: 'auto',
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
                transition: `filter var(--dur-normal) var(--ease-out)`,
              }}
            />
          </Link>
        </div>

        {/* ── Mobile only: Menu toggle (< md) ───────────────────────── */}
        <div className="col-span-3 flex justify-end items-center md:hidden">
          <div
            ref={togglerRef}
            role="button"
            tabIndex={0}
            aria-label="Open menu"
            onClick={openMenu}
            onKeyDown={e => e.key === 'Enter' && openMenu()}
            className="cursor-pointer body-14 uppercase"
            style={{ letterSpacing: '0.06em' }}
          >
            Menu
          </div>
        </div>

        {/* ── Desktop: Nav links (md+) ───────────────────────────────── */}
        <div className="col-span-6 max-md:hidden flex items-center" style={{ gap: '0.6rem' }}>
          {NAV.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline body-14 uppercase"
              style={{ letterSpacing: '0.04em' }}
            >
              {l.label}{l.comma && ','}
            </Link>
          ))}
        </div>

        {/* ── Desktop: Time + Location (md+) ─────────────────────────── */}
        <div className="col-span-3 max-md:hidden flex items-center" style={{ gap: '2rem' }}>
          {mounted && <LiveClock />}
          <span className="body-12 uppercase" style={{ letterSpacing: '0.06em', opacity: 0.8 }}>
            Lugano, CH
          </span>
        </div>

        {/* ── Desktop: Contact (md+) ──────────────────────────────────── */}
        <div className="col-span-1 max-md:hidden flex items-center justify-end">
          <Link
            href="/contact"
            className="link-underline body-14 uppercase"
            style={{ letterSpacing: '0.04em' }}
          >
            Contact
          </Link>
        </div>
      </header>

      {/* ── Mobile overlay (< md) ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 md:hidden pointer-events-none"
        style={{ background: '#0b1d3d', opacity: 0, zIndex: 19 }}
        aria-hidden="true"
      />

      {/* ── Mobile menu (< md) ────────────────────────────────────────── */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full md:hidden overflow-hidden"
        style={{
          height: '100svh',
          background: 'var(--color-mist)',
          color: '#0b1d3d',
          zIndex: 20,
          /* GSAP owns xPercent — no React visibility fighting it */
        }}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 flex flex-col justify-center"
          style={{ padding: 'var(--margin)' }}
        >
          {/* Top bar inside menu */}
          <div
            className="absolute top-0 left-0 w-full grid-w"
            style={{ height: 'var(--header-height)', alignContent: 'center' }}
          >
            <div className="col-span-3">
              <Link href="/" onClick={closeMenu} aria-label="Belvedere — home">
                <Image
                  src="/BELVEDERE_PROPERTIES_LOGO_RGB.png"
                  alt="Belvedere Properties SA"
                  width={180}
                  height={60}
                  style={{ width: '10rem', height: 'auto' }}
                />
              </Link>
            </div>
            <div className="col-span-3 flex justify-end items-center">
              <div
                ref={closeRef}
                role="button"
                tabIndex={0}
                aria-label="Close menu"
                onClick={closeMenu}
                onKeyDown={e => e.key === 'Enter' && closeMenu()}
                className="cursor-pointer body-14 uppercase"
                style={{ letterSpacing: '0.06em' }}
              >
                Close
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-col items-start"
            style={{ gap: '1.6rem' }}
            aria-label="Mobile navigation"
          >
            {[{ label: 'Home', href: '/' }, ...NAV, { label: 'Contact', href: '/contact', comma: false }].map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="overflow-hidden block"
              >
                <span
                  className="inline-block body-48 md:body-60"
                  style={{ letterSpacing: '-0.01em', lineHeight: 1.1 }}
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="absolute bottom-0 left-0 w-full grid-w"
            style={{ paddingBottom: 'var(--margin)' }}
          >
            <span className="col-span-full body-12 uppercase" style={{ opacity: 0.5, letterSpacing: '0.1em' }}>
              Morcote · Switzerland
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
