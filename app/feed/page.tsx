'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { EVENTS } from '@/lib/events'
import BottomNav from '../components/BottomNav'

const TABS = ['Explore', 'Following', 'For You']

type Event = {
  id: string
  slug: string
  name: string
  venue: string
  date: string
  time: string
  price: number | null
  type: string
  image: string
  images?: string[]
  video?: string
}

function EventCard({ event }: { event: Event }) {
  const [mediaIndex, setMediaIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const allMedia = [
    ...(event.video ? ['video'] : []),
    ...(event.images ? event.images : [event.image]),
  ]

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setMediaIndex(prev => (prev + 1) % allMedia.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    setMediaIndex(prev => (prev - 1 + allMedia.length) % allMedia.length)
  }

  const currentMedia = allMedia[mediaIndex]
  const isVideo = currentMedia === 'video'

  return (
    <Link
      href={`/events/${event.slug}`}
      className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition"
    >
      {/* Media Container */}
      <div className="relative w-full h-80">
        {isVideo ? (
          <video
            ref={videoRef}
            src={event.video}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={currentMedia}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-black/80 transition"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-black/80 transition"
            >
              ›
            </button>
          </>
        )}

        {/* Dots indicator */}
        {allMedia.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {allMedia.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition ${
                  i === mediaIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Video indicator */}
        {isVideo && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            ▶ Video
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="p-4">
        <span className="text-xs bg-white text-black px-2 py-1 rounded">
          {event.type}
        </span>
        <h3 className="font-bold text-lg mt-2">{event.name}</h3>
        <p className="text-sm text-gray-400 mt-1">📍 {event.venue}</p>
        <p className="text-sm text-gray-400">
          📅 {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>
        {event.price && (
          <p className="text-sm font-semibold mt-2">
            ₦{event.price.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function FeedPage() {
  const [tab, setTab] = useState(0)

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4">
          <img src="/flo-logo.webp" alt="flo" className="h-8 object-contain" />
          <Link href="/profile" className="text-2xl">👤</Link>
        </div>
        <div className="flex border-t border-gray-800">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-3 text-sm font-semibold transition ${
                tab === i ? 'border-b-2 border-white' : 'text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="space-y-6 px-6 py-6">
        {EVENTS.map(event => (
          <EventCard key={event.id} event={event as Event} />
        ))}
      </main>

      <BottomNav />
    </div>
  )
}