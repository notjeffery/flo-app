'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VENUES } from '@/lib/venues'
import BottomNav from '../components/BottomNav'

const FILTERS = ['All', 'Nightclub', 'Lounge', 'Beach Club', 'Beach']

function VenueSlide({ venue }: { venue: any }) {
  const router = useRouter()
  const [following, setFollowing] = useState(false)

  return (
    <div className="relative w-full h-screen flex-shrink-0 snap-start overflow-hidden bg-black">
      {/* Full screen video */}
      <video
        src={venue.video}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32" />

      {/* Right actions */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
        <button
          onClick={() => setFollowing(!following)}
          className="flex flex-col items-center gap-1"
        >
          <div className={`text-3xl transition ${following ? 'scale-125' : ''}`}>
            {following ? '❤️' : '🤍'}
          </div>
          <span className="text-xs text-white">{following ? 'Following' : 'Follow'}</span>
        </button>

        <button
          onClick={() => router.push(`/venues/${venue.slug}`)}
          className="flex flex-col items-center gap-1"
        >
          <div className="text-3xl">🪑</div>
          <span className="text-xs text-white">Tables</span>
        </button>

        <button
          onClick={() => router.push('/checkout')}
          className="flex flex-col items-center gap-1"
        >
          <div className="text-3xl">🎟️</div>
          <span className="text-xs text-white">Book</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="text-3xl">↗️</div>
          <span className="text-xs text-white">Share</span>
        </button>
      </div>

      {/* Bottom venue info */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-28 z-10"
        onClick={() => router.push(`/venues/${venue.slug}`)}
      >
        <span className="text-xs bg-white text-black px-2 py-1 rounded mb-2 inline-block">
          {venue.type}
        </span>
        <h2 className="text-2xl font-bold text-white mb-1">{venue.name}</h2>
        <p className="text-sm text-gray-300 mb-1">📍 {venue.address}</p>
        <p className="text-sm text-gray-300 mb-2">
          {venue.followers.toLocaleString()} followers · {venue.instagram}
        </p>
        <p className="text-sm text-gray-400">{venue.description}</p>
        <p className="text-xs text-gray-400 mt-2 animate-bounce">Swipe up for next venue ↑</p>
      </div>
    </div>
  )
}

function VenueCard({ venue }: { venue: any }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/venues/${venue.slug}`)}
      className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition cursor-pointer"
    >
      <div className="relative w-full h-48">
        <video
          src={venue.video}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="p-4">
        <span className="text-xs bg-white text-black px-2 py-1 rounded">{venue.type}</span>
        <h3 className="font-bold text-lg mt-2">{venue.name}</h3>
        <p className="text-sm text-gray-400 mt-1">📍 {venue.address}</p>
        <p className="text-sm text-gray-400">{venue.followers.toLocaleString()} followers</p>
      </div>
    </div>
  )
}

export default function VenuesPage() {
  const [filter, setFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filtered = filter === 'All'
    ? VENUES
    : VENUES.filter(v => v.type === filter)

  // MOBILE - TikTok snap scroll
  if (isMobile) {
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        {/* Floating header */}
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white drop-shadow">Venues</h1>
        </header>

        {/* Floating filters */}
        <div className="absolute top-14 left-0 right-0 z-50 flex gap-2 px-4 overflow-x-auto pb-1">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filter === f ? 'bg-white text-black' : 'bg-black/50 text-white border border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TikTok scroll */}
        <div
          className="flex-1 overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {filtered.map(venue => (
            <VenueSlide key={venue.id} venue={venue} />
          ))}
        </div>

        <BottomNav />
      </div>
    )
  }

  // DESKTOP - Grid layout
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold">Venues</h1>
      </header>

      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              filter === f ? 'bg-white text-black' : 'bg-gray-900 text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <main className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}