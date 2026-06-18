'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EVENTS } from '@/lib/events'
import BottomNav from '../components/BottomNav'

const TABS = ['Explore', 'Following', 'For You']

type Event = {
  id: string
  slug: string
  name: string
  venue: string
  address: string
  date: string
  time: string
  price: number | null
  type: string
  image: string
  images?: string[]
  video?: string
}

function EventSlide({ event }: { event: Event }) {
  const router = useRouter()
  const [mediaIndex, setMediaIndex] = useState(0)
  const [interested, setInterested] = useState(false)

  const allMedia = [
    ...(event.video ? ['video'] : []),
    ...(event.images ? event.images : [event.image]),
  ]

  const currentMedia = allMedia[mediaIndex]
  const isVideo = currentMedia === 'video'

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMediaIndex(prev => (prev + 1) % allMedia.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMediaIndex(prev => (prev - 1 + allMedia.length) % allMedia.length)
  }

  return (
    <div className="relative w-full h-screen flex-shrink-0 snap-start overflow-hidden bg-black">

      {/* Media */}
      {isVideo ? (
        <video
          src={event.video}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={currentMedia}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32" />

      {/* Media arrows */}
      {allMedia.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center z-10">‹</button>
          <button onClick={handleNext} className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center z-10">›</button>
        </>
      )}

      {/* Media dots */}
      {allMedia.length > 1 && (
        <div className="absolute top-20 left-0 right-0 flex justify-center gap-1 z-10">
          {allMedia.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === mediaIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          ))}
        </div>
      )}

      {/* Right actions */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
        <button onClick={() => setInterested(!interested)} className="flex flex-col items-center gap-1">
          <div className={`text-3xl transition ${interested ? 'scale-125' : ''}`}>
            {interested ? '❤️' : '🤍'}
          </div>
          <span className="text-xs text-white">{interested ? 'Interested' : 'Interest'}</span>
        </button>
        <button onClick={() => router.push(`/events/${event.slug}/attendees`)} className="flex flex-col items-center gap-1">
          <div className="text-3xl">👥</div>
          <span className="text-xs text-white">Who's going</span>
        </button>
        <button onClick={() => router.push('/checkout')} className="flex flex-col items-center gap-1">
          <div className="text-3xl">🎟️</div>
          <span className="text-xs text-white">Book</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="text-3xl">↗️</div>
          <span className="text-xs text-white">Share</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-28 z-10" onClick={() => router.push(`/events/${event.slug}`)}>
        <span className="text-xs bg-white text-black px-2 py-1 rounded mb-2 inline-block">{event.type}</span>
        <h2 className="text-2xl font-bold text-white mb-1">{event.name}</h2>
        <p className="text-sm text-gray-300">📍 {event.venue}</p>
        <p className="text-sm text-gray-300 mb-1">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
        {event.price ? (
          <p className="text-sm font-semibold text-white">From ₦{event.price.toLocaleString()}</p>
        ) : (
          <p className="text-sm text-gray-300">Price on request</p>
        )}
        <p className="text-xs text-gray-400 mt-2 animate-bounce">Swipe up for next ↑</p>
      </div>
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const router = useRouter()
  const [mediaIndex, setMediaIndex] = useState(0)

  const allMedia = [
    ...(event.video ? ['video'] : []),
    ...(event.images ? event.images : [event.image]),
  ]

  const currentMedia = allMedia[mediaIndex]
  const isVideo = currentMedia === 'video'

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setMediaIndex(prev => (prev + 1) % allMedia.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    setMediaIndex(prev => (prev - 1 + allMedia.length) % allMedia.length)
  }

  return (
    <Link href={`/events/${event.slug}`} className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition">
      <div className="relative w-full h-80">
        {isVideo ? (
          <video
            src={event.video}
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline
          />
        ) : (
          <img src={currentMedia} alt={event.name} className="w-full h-full object-cover" />
        )}

        {allMedia.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center">‹</button>
            <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center">›</button>
          </>
        )}

        {allMedia.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {allMedia.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === mediaIndex ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        )}

        {isVideo && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">▶ Video</div>
        )}
      </div>

      <div className="p-4">
        <span className="text-xs bg-white text-black px-2 py-1 rounded">{event.type}</span>
        <h3 className="font-bold text-lg mt-2">{event.name}</h3>
        <p className="text-sm text-gray-400 mt-1">📍 {event.venue}</p>
        <p className="text-sm text-gray-400">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
        {event.price && <p className="text-sm font-semibold mt-2">₦{event.price.toLocaleString()}</p>}
      </div>
    </Link>
  )
}

export default function FeedPage() {
  const [tab, setTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
          <img src="/flo-logo.webp" alt="flo" className="h-7 object-contain" />
          <Link href="/profile" className="text-2xl">👤</Link>
        </header>

        <div className="absolute top-14 left-0 right-0 z-50 flex justify-center gap-6">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`text-sm font-semibold pb-1 transition ${tab === i ? 'text-white border-b-2 border-white' : 'text-white/50'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {EVENTS.map(event => (
            <EventSlide key={event.id} event={event as Event} />
          ))}
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4">
          <img src="/flo-logo.webp" alt="flo" className="h-7 object-contain" />
          <Link href="/profile" className="text-2xl">👤</Link>
        </div>
        <div className="flex border-t border-gray-800">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-3 text-sm font-semibold transition ${tab === i ? 'border-b-2 border-white' : 'text-gray-400'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="space-y-6 px-6 py-6 max-w-2xl mx-auto">
        {EVENTS.map(event => (
          <EventCard key={event.id} event={event as Event} />
        ))}
      </main>

      <BottomNav />
    </div>
  )
}