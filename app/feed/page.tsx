'use client'
import { useState } from 'react'
import Link from 'next/link'
import { EVENTS } from '@/lib/events'

const TABS = ['Explore', 'Following', 'For You']

export default function FeedPage() {
  const [tab, setTab] = useState(0)

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">flo</h1>
          <Link href="/profile" className="text-2xl">👤</Link>
        </div>
        
        {/* TikTok Tabs */}
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

      {/* Events Feed */}
      <main className="space-y-6 px-6 py-6">
        {EVENTS.map(event => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-80 object-cover"
            />
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
        ))}
      </main>
    </div>
  )
}
