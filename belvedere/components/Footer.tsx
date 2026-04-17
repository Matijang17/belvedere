'use client'

import { useState } from 'react'
import Link from 'next/link'


const NAV = [
  { label: 'Work',     href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Studio',   href: '/studio' },
  { label: 'Contact',  href: '/contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer
      className="flex flex-col items-end"
      style={{ marginTop: '-1px' }}
      aria-label="Site footer"
    >
      {/* ══ WHITE CONTENT SECTION ══════════════════════════════════ */}
      <div
        className="relative w-full grid-w"
        style={{
          background: 'var(--color-white)',
          paddingTop: '10rem',
          paddingBottom: 'var(--margin)',
          alignContent: 'end',
        }}
        data-bg="light"
      >
        {/* ── Col 1–5: Talk to us + Newsletter ─────────────────── */}
        <div
          className="col-span-full xl:col-span-5 flex flex-col items-start justify-between"
          style={{ gap: '3.2rem', marginBottom: 'calc(var(--margin)*2)' }}
        >
          <div className="flex flex-col items-start" style={{ gap: '1rem' }}>
            <span
              className="body-24"
              style={{ color: 'var(--color-champagne)' }}
            >
              Talk to us about your project
            </span>
            <Link
              href="/contact"
              className="link-underline body-36 md:body-48"
              style={{ color: 'var(--color-navy)', lineHeight: 1 }}
            >
              Contact us
            </Link>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-[40rem]">
            <div
              className="body-14"
              style={{ color: 'var(--color-navy)', opacity: 0.5, marginBottom: '1.6rem' }}
            >
              Subscribe to our newsletter
            </div>
            <form
              onSubmit={e => { e.preventDefault(); setSent(true); setEmail('') }}
              className="flex justify-between"
              style={{
                gap: '2rem',
                borderBottom: '1px solid var(--color-navy)',
                paddingBottom: '0.8rem',
              }}
              noValidate
            >
              {sent ? (
                <span className="body-14" style={{ color: 'var(--color-navy)' }}>
                  Thanks for joining!
                </span>
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address"
                  className="body-14"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--color-navy)',
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                />
              )}
              <button
                type="submit"
                aria-label="Subscribe"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1.2 0C1.42 0 1.6.18 1.6.4V3.95c0 .14.11.25.25.25H9.6c-.07-.12-.15-.23-.25-.33L6.73 1.25c-.17-.17-.17-.46 0-.63l.41-.41c.17-.17.46-.17.63 0L12.11 4.54c.25.25.25.66 0 .91L7.77 9.79c-.17.17-.46.17-.63 0l-.41-.41c-.17-.17-.17-.46 0-.63L9.35 6.13c.1-.1.18-.21.25-.33H.5C.22 5.8 0 5.58 0 5.3V.4C0 .18.18 0 .4 0H1.2Z" fill="currentColor"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* ── Col 7–9: Navigation ───────────────────────────────── */}
        <div
          className="col-span-full xl:col-start-7 xl:col-end-9 flex flex-col items-start"
          style={{ gap: 'calc(var(--margin)*4)', marginBottom: 'calc(var(--margin)*2)' }}
        >
          <nav className="flex flex-col items-start" style={{ gap: '0.4rem' }} aria-label="Footer navigation">
            <Link href="/" className="body-16 xl:hover:text-[var(--color-champagne)]" style={{ color: 'var(--color-navy)', transition: 'color var(--transition-duration-normal) var(--ease-out)' }}>Home</Link>
            {NAV.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="body-16 xl:hover:text-[var(--color-champagne)]"
                style={{ color: 'var(--color-navy)', transition: 'color var(--transition-duration-normal) var(--ease-out)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Col 10–13: Contact + Social ──────────────────────── */}
        <div
          className="col-span-full xl:col-start-10 xl:col-end-13 flex flex-col justify-between"
          style={{ gap: '2rem', marginBottom: 'calc(var(--margin)*2)' }}
        >
          <div className="flex flex-col" style={{ gap: '1.2rem' }}>
            {/* Location */}
            <div className="flex" style={{ gap: '3rem' }}>
              <span className="body-14" style={{ color: 'var(--color-champagne)', flexShrink: 0 }}>L</span>
              <address
                className="body-14"
                style={{ color: 'var(--color-navy)', fontStyle: 'normal', lineHeight: 1.8, opacity: 0.7 }}
              >
                Strada Cons. Achille Isella 11<br />
                6922 Morcote<br />
                Switzerland
              </address>
            </div>
            {/* Phone */}
            <div className="flex" style={{ gap: '3rem' }}>
              <span className="body-14" style={{ color: 'var(--color-champagne)', flexShrink: 0 }}>P</span>
              <a
                href="tel:+41793982999"
                className="body-14 xl:hover:text-[var(--color-champagne)]"
                style={{ color: 'var(--color-navy)', opacity: 0.7, transition: 'color var(--transition-duration-normal) var(--ease-out)' }}
              >
                +41 79 398 29 99
              </a>
            </div>
            {/* Email */}
            <div className="flex" style={{ gap: '3rem' }}>
              <span className="body-14" style={{ color: 'var(--color-champagne)', flexShrink: 0 }}>E</span>
              <a
                href="mailto:maja.lozej@belvedere-properties.ch"
                className="body-14 xl:hover:text-[var(--color-champagne)]"
                style={{ color: 'var(--color-navy)', opacity: 0.7, transition: 'color var(--transition-duration-normal) var(--ease-out)' }}
              >
                maja.lozej@belvedere-properties.ch
              </a>
            </div>
          </div>
        </div>

        {/* ── Mobile copyright ──────────────────────────────────── */}
        <div className="col-span-full xl:hidden" style={{ marginTop: '4rem' }}>
          <p className="body-12" style={{ color: 'var(--color-navy)', opacity: 0.4 }}>
            All rights reserved<br />
            © 2026 Belvedere Properties SA
          </p>
        </div>
      </div>

      {/* ══ NAVY STICKY BOTTOM: full-width SVG wordmark ════════════ */}
      <div
        className="sticky bottom-0 w-full overflow-hidden"
        style={{ background: 'var(--color-navy)', zIndex: 0 }}
        data-bg="dark"
      >
        <div style={{ padding: 'var(--margin)' }}>
          <div className="flex flex-col" style={{ gap: '2rem' }}>
            {/* Belvedere Properties SA logo mark */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 283.46 283.46"
                aria-label="Belvedere Properties SA"
                role="img"
                style={{ width: 'min(26rem, 60vw)', height: 'auto', display: 'block' }}
              >
                <defs>
                  <style>{`
                    .ft-st0 { fill: #ffffff; }
                    .ft-st1 { fill: url(#ft-lg1); }
                    .ft-st2 { fill: url(#ft-lg2); }
                  `}</style>
                  <linearGradient id="ft-lg2" x1="115.64" y1="111.34" x2="168.5" y2="111.34" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#74655a"/>
                    <stop offset="1" stopColor="#d4b792"/>
                  </linearGradient>
                  <linearGradient id="ft-lg1" x1="115.64" y1="128.67" x2="168.5" y2="128.67" xlinkHref="#ft-lg2"/>
                </defs>
                <g>
                  <path className="ft-st0" d="M116.52,164.31"/>
                  <g>
                    <path className="ft-st0" d="M60.26,160.8h8.49c2.24.27,4.93,1,5.54,3.49.38,1.56-.14,3.22-1.42,4.22-.42.33-.94.5-1.35.83,2.65.54,4.08,2.38,3.89,5.1-.22,3.15-3.12,4.27-5.87,4.51h-9.27v-18.15ZM63.46,168.95c3.14.02,8.23.51,7.76-4.12-.2-1.97-2.19-3.06-4.03-3.06h-3.74v7.18ZM63.46,177.98h4.71c5.44,0,5.43-8.06.29-8.06h-5v8.06Z"/>
                    <path className="ft-st0" d="M190.4,160.8h8.97c2.91.27,5.98,1.78,5.68,5.18-.28,3.2-3.45,4.25-6.2,4.48l6.21,8.49h-3.74l-6.01-8.25c-.46-.44-1.13-.25-1.7-.29v8.54h-3.2v-18.15ZM193.6,169.44h4.61c3.43,0,5-4.64,2.42-6.69-.62-.5-2.03-.97-2.81-.97h-4.22v7.67Z"/>
                    <path className="ft-st0" d="M151.27,178.95v-18.15c4.04.23,8.42-.79,12.06,1.38,5.95,3.53,5.73,12.47-.43,15.64-3.57,1.84-7.77.9-11.63,1.13ZM154.47,177.98c2-.01,3.99.18,5.84-.71,5.48-2.61,5.39-12.66-.31-14.97-1.75-.71-3.68-.51-5.53-.54v16.21Z"/>
                    <polygon className="ft-st0" points="92.71 160.8 92.71 161.77 83.1 161.77 83.1 169.05 90.67 169.05 90.67 170.02 83.1 170.02 83.1 177.98 92.71 177.98 92.71 178.95 79.9 178.95 79.9 160.8 92.71 160.8"/>
                    <polygon className="ft-st0" points="145.57 160.8 145.57 161.77 135.96 161.77 135.96 169.05 143.53 169.05 143.53 170.02 135.96 170.02 135.96 177.98 145.57 177.98 145.57 178.95 132.75 178.95 132.75 160.8 145.57 160.8"/>
                    <polygon className="ft-st0" points="185.15 160.8 185.15 161.77 175.54 161.77 175.54 169.05 183.11 169.05 183.11 170.02 175.54 170.02 175.54 177.98 185.15 177.98 185.15 178.95 172.34 178.95 172.34 160.8 185.15 160.8"/>
                    <polygon className="ft-st0" points="223.21 160.8 223.21 161.77 213.6 161.77 213.6 169.05 221.17 169.05 221.17 170.02 213.6 170.02 213.6 177.98 223.21 177.98 223.21 178.95 210.4 178.95 210.4 160.8 223.21 160.8"/>
                    <path className="ft-st0" d="M115.02,160.8l5.78,16.01,5.88-16.01h1.16s-6.74,18.15-6.74,18.15c-.87-.09-1.88.1-2.73,0-.14-.02-.26,0-.33-.16l-6.41-18h3.4Z"/>
                    <polygon className="ft-st0" points="101.16 160.8 101.16 177.98 110.28 177.98 110.28 178.95 97.96 178.95 97.96 160.8 101.16 160.8"/>
                  </g>
                  <g>
                    <path className="ft-st0" d="M82.8,189.73c.4,0,.76.08,1.09.24.33.16.59.38.78.67s.28.61.28.96-.09.68-.28.96c-.19.29-.45.51-.78.67-.33.16-.69.24-1.09.24h-1.71v2.1h-.66v-5.83h2.37ZM83.84,192.51c.29-.22.44-.52.44-.91s-.15-.69-.44-.91-.68-.33-1.16-.33h-1.59v2.48h1.59c.48,0,.87-.11,1.16-.33Z"/>
                    <path className="ft-st0" d="M95.42,192.48c-.16.27-.37.48-.65.65-.28.17-.59.27-.93.31l1.48,2.11h-.76l-1.48-2.1h-1.29v2.1h-.66v-5.83h2.37c.4,0,.76.08,1.09.24.33.16.59.38.78.67s.28.61.28.96c0,.32-.08.62-.23.88ZM91.8,192.84h1.59c.48,0,.87-.11,1.16-.33s.44-.52.44-.91-.15-.69-.44-.91-.68-.33-1.16-.33h-1.59v2.48Z"/>
                    <path className="ft-st0" d="M103.06,195.25c-.46-.27-.83-.64-1.1-1.11-.27-.46-.41-.96-.41-1.5s.14-1.04.41-1.5c.27-.46.64-.83,1.1-1.1.46-.27.95-.41,1.48-.41s1.03.14,1.48.41.82.64,1.09,1.1c.27.46.41.96.41,1.5s-.14,1.04-.41,1.5c-.27.46-.64.83-1.09,1.11-.46.27-.95.41-1.48.41s-1.02-.14-1.48-.41ZM105.7,194.72c.35-.22.64-.51.84-.88.21-.37.31-.77.31-1.2s-.1-.82-.31-1.19c-.21-.37-.49-.66-.84-.88s-.74-.33-1.15-.33-.8.11-1.15.33c-.35.22-.64.51-.85.88-.21.37-.32.77-.32,1.19s.11.83.32,1.2c.21.37.49.66.85.88.35.22.74.33,1.15.33s.8-.11,1.15-.33Z"/>
                    <path className="ft-st0" d="M116.1,189.73c.4,0,.76.08,1.09.24.33.16.59.38.78.67s.28.61.28.96-.09.68-.28.96c-.19.29-.45.51-.78.67-.33.16-.69.24-1.09.24h-1.71v2.1h-.66v-5.83h2.37ZM117.14,192.51c.29-.22.44-.52.44-.91s-.15-.69-.44-.91-.68-.33-1.16-.33h-1.59v2.48h1.59c.48,0,.87-.11,1.16-.33Z"/>
                    <path className="ft-st0" d="M128.63,190.36h-3.51v1.92h3.17v.63h-3.17v2.03h3.51v.63h-4.18v-5.83h4.18v.63Z"/>
                    <path className="ft-st0" d="M139.12,192.48c-.16.27-.37.48-.65.65-.28.17-.59.27-.93.31l1.48,2.11h-.76l-1.48-2.1h-1.29v2.1h-.66v-5.83h2.37c.4,0,.76.08,1.09.24.33.16.59.38.78.67s.28.61.28.96c0,.32-.08.62-.23.88ZM135.5,192.84h1.59c.48,0,.87-.11,1.16-.33s.44-.52.44-.91-.15-.69-.44-.91-.68-.33-1.16-.33h-1.59v2.48Z"/>
                    <path className="ft-st0" d="M147.14,190.36h-1.96v-.63h4.58v.63h-1.96v5.2h-.66v-5.2Z"/>
                    <path className="ft-st0" d="M155.93,189.73h.66v5.83h-.66v-5.83Z"/>
                    <path className="ft-st0" d="M167.19,190.36h-3.51v1.92h3.17v.63h-3.17v2.03h3.51v.63h-4.18v-5.83h4.18v.63Z"/>
                    <path className="ft-st0" d="M173.02,194.73l.42-.52c.27.27.55.47.87.62.31.15.66.22,1.04.22.29,0,.53-.05.74-.14.2-.09.36-.22.46-.37s.16-.32.16-.5c0-.29-.12-.52-.37-.67-.25-.16-.65-.3-1.2-.43-.42-.1-.77-.21-1.05-.34-.27-.12-.49-.29-.64-.5-.15-.21-.22-.48-.22-.8,0-.31.08-.59.25-.84.17-.25.4-.46.7-.6s.63-.22,1-.22c.41,0,.78.07,1.12.22.33.14.64.35.93.62l-.41.52c-.25-.24-.51-.42-.8-.55-.28-.13-.57-.2-.87-.2-.23,0-.44.05-.64.14-.19.09-.34.22-.45.37-.11.16-.16.32-.16.5,0,.28.12.49.36.63.24.14.65.28,1.21.42.62.15,1.1.35,1.42.6.33.25.49.62.49,1.09,0,.32-.08.6-.23.86-.16.25-.39.46-.7.6-.31.15-.68.22-1.12.22-.91,0-1.67-.31-2.3-.93Z"/>
                    <path className="ft-st0" d="M187.14,194.73l.42-.52c.27.27.55.47.87.62.31.15.66.22,1.04.22.29,0,.53-.05.74-.14.2-.09.36-.22.46-.37s.16-.32.16-.5c0-.29-.12-.52-.37-.67-.25-.16-.65-.3-1.2-.43-.42-.1-.77-.21-1.05-.34-.27-.12-.49-.29-.64-.5-.15-.21-.22-.48-.22-.8,0-.31.08-.59.25-.84.17-.25.4-.46.7-.6s.63-.22,1-.22c.41,0,.78.07,1.12.22.33.14.64.35.93.62l-.41.52c-.25-.24-.51-.42-.8-.55-.28-.13-.57-.2-.87-.2-.23,0-.44.05-.64.14-.19.09-.34.22-.45.37-.11.16-.16.32-.16.5,0,.28.12.49.36.63.24.14.65.28,1.21.42.62.15,1.1.35,1.42.6.33.25.49.62.49,1.09,0,.32-.08.6-.23.86-.16.25-.39.46-.7.6-.31.15-.68.22-1.12.22-.91,0-1.67-.31-2.3-.93Z"/>
                    <path className="ft-st0" d="M202.31,195.56l-.59-1.32h-3.25l-.59,1.32h-.72l2.57-5.83h.72l2.57,5.83h-.72ZM198.75,193.61h2.71l-1.35-3.06-1.36,3.06Z"/>
                  </g>
                </g>
                <g>
                  <path className="ft-st2" d="M129.48,94.96v39.92s5.19-5.28,5.19-5.28v-39.9h8.09c5.05,0,9.16,4.07,9.16,9.09,0,1.88-.59,3.65-1.57,5.1l-10.3,12.62-.16,7.78,5.26-5.35-.03-1.12c.03-1.64.22-3.24.99-4.44,1.48-2.31,3.2-4.45,4.87-6.61,1.42-1.84,3.01-3.88,3.75-6.11.12-.35.21-.71.28-1.08,1.05-5.53-3.09-11.23-8.77-11.66-.74-.06-1.49-.09-2.25-.11h-18.62l1.77,1.43c2.09,1.6,2.24,3.23,2.34,5.73Z"/>
                  <path className="ft-st1" d="M166.96,127.82c0-.08,0-.16-.01-.24-.01-.17-.02-.34-.04-.5,0-.09-.02-.17-.03-.26-.02-.17-.04-.34-.07-.51-.01-.07-.02-.14-.03-.22-.04-.23-.08-.46-.12-.68-.02-.08-.04-.16-.05-.25-.03-.15-.07-.3-.1-.44-.03-.1-.05-.2-.08-.3-.03-.13-.07-.26-.11-.38-.03-.1-.06-.21-.09-.31-.04-.13-.09-.26-.13-.39-.06-.18-.13-.36-.2-.53-.04-.11-.08-.21-.12-.32-.05-.12-.1-.24-.16-.36-.04-.08-.07-.17-.11-.25-.06-.13-.12-.25-.18-.38-.03-.06-.07-.13-.1-.19-.24-.47-.51-.93-.79-1.37-.01-.02-.03-.05-.04-.07-.1-.15-.2-.3-.31-.45-.01-.02-.03-.04-.04-.06-2.42-3.41-6.15-5.82-10.45-6.52,5.53,2.06,9.45,7.25,9.45,13.33,0,2.82-.85,5.45-2.31,7.66-.39.71-.84,1.37-1.36,1.97,0,0,0,0,0,0-2.02,2.32-5,3.8-8.32,3.8h-5.01s0,.04,0,.06c-.42,0-.84,0-1.26,0-.35,0-.7,0-1.04,0,0-.02,0-.03,0-.05h-23l-4.24,4.9h34.56c5.64,0,10.6-2.95,13.43-7.38.01-.02.02-.04.03-.05.11-.17.21-.34.31-.51.02-.03.04-.06.06-.1.1-.17.19-.33.28-.5.02-.04.04-.08.06-.11.09-.17.17-.34.26-.51.01-.03.03-.06.04-.09.25-.54.47-1.1.66-1.67.02-.06.04-.12.06-.18.04-.14.08-.27.12-.41.03-.1.06-.2.09-.3.03-.13.06-.25.09-.38.03-.12.06-.23.08-.35.03-.12.05-.24.07-.36.02-.13.05-.26.07-.39.02-.12.04-.23.05-.35.02-.14.04-.28.05-.42.01-.11.03-.22.04-.33.02-.16.03-.32.04-.49,0-.09.01-.18.02-.27.01-.25.02-.5.02-.75,0,0,0,0,0-.01h0s0,0,0,0c0-.25,0-.49-.02-.73Z"/>
                </g>
              </svg>
            </div>

            {/* Desktop copyright row */}
            <div
              className="flex justify-between max-xl:hidden"
              style={{ color: 'var(--color-white)' }}
            >
              <p className="body-12" style={{ opacity: 0.5 }}>
                All rights reserved · © 2026 Belvedere Properties SA
              </p>
              <div className="flex" style={{ gap: '3.2rem' }}>
                <Link href="#" className="link-underline-footer body-12" style={{ color: 'var(--color-white)', opacity: 0.5 }}>
                  Privacy policy
                </Link>
                <Link href="#" className="link-underline-footer body-12" style={{ color: 'var(--color-white)', opacity: 0.5 }}>
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
