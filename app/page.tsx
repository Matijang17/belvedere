'use client'

import { useState, useCallback } from 'react'
import Loader from '@/components/Loader'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Studio from '@/components/Studio'
import WorksGallery from '@/components/WorksGallery'
import Vision from '@/components/Vision'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
  }, [])

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <Header />
      {/* Negative margin pulls content behind the sticky header — TC pattern */}
      <main style={{ marginTop: 'calc(var(--header-height) * -1)' }}>
        <Hero loaderDone={loaderDone} />
        <Studio />
        <Portfolio />
        <WorksGallery />
        <Vision />
        <Process />
      </main>
      <Footer />
    </>
  )
}
