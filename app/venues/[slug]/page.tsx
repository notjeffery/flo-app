'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { VENUES } from '@/lib/venues'
import { EVENTS } from '@/lib/events'
import FloorPlan from '@/app/components/FloorPlan'

export default function VenuePage() {
  const params = useParams()
  const router = useRouter()
  const venue = VENUES.find(v => v.slug === params.slug)
  const [following, setFollowing] = useState(false)

  if (!venue) return <div className="min-h-screen flex items-center justify-center">Venue not found</div>

  const upcomingEvents = EVENTS.filter(e =>
    e.venue.toLowerCase().includes(venue.name.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4 z-50">
        <button onClick={() => router.back()} className="text-2xl">←</button>
      </header>

      <img
        src={venue.detail || venue.cover}
        alt={venue.name}
        className="w-full h-64 object-cover"
      />

      <div className="px-6 py-6">
        <div className="flex items-start gap-4 mb-4">
          <img src={venue.logo} alt={venue.name} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{venue.name}</h1>
            <p className="text-sm text-gray-400">{venue.type}</p>
            <p className="text-sm text-gray-400 mt-1">{venue.followers.toLocaleString()} followers</p>
          </div>
          <button
            onClick={() => setFollowing(!following)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              following ? 'bg-gray-900 text-white border border-gray-700' : 'bg-white text-black'
            }`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <p className="text-gray-400 mb-2">{venue.description}</p>
        <p className="text-sm text-gray-400">📍 {venue.address}</p>
        <p className="text-sm text-gray-400 mt-1">📸 {venue.instagram}</p>

        {/* Floor Plan + Table List Toggle */}
        <div className="mt-8">
          <FloorPlan tables={venue.tables} venueName={venue.name} />
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block bg-gray-900 rounded-xl overflow-hidden hover:opacity-90 transition"
                >
                  {event.image && (
                    <img src={event.image} alt={event.name} className="w-full h-32 object-cover" />
                  )}
                  <div className="p-4">
                    <h4 className="font-bold">{event.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}