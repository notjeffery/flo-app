'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [phase, setPhase] = useState<'show' | 'zoom' | 'black'>('show')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom'), 1500)
    const t2 = setTimeout(() => setPhase('black'), 3000)
    const t3 = setTimeout(() => router.push('/feed'), 3500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#000' }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          opacity: phase === 'black' ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          transform:
            phase === 'zoom'
              ? 'scale(15) translate(-24px, 0px)'
              : phase === 'black'
              ? 'scale(40) translate(-24px, 0px)'
              : 'scale(1)',
          transition:
            phase === 'zoom'
              ? 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              : phase === 'black'
              ? 'transform 0.5s ease-in'
              : 'none',
          transformOrigin: 'center center',
        }}
      >
        <img src="/flo-logo.webp" alt="flo" style={{ width: '300px' }} />
      </div>
    </main>
  )
}