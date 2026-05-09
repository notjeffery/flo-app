'use client'
import { useState } from 'react'
import Link from 'next/link'
import { VENUES } from '@/lib/venues'
import BottomNav from '../components/BottomNav'

const FILTERS = ['All', 'Nightclub', 'Lounge', 'Beach Club', 'Beach']

export default function VenuesPage() {
  const [filter, setFilter] = useState('All')
  
  const filtered = filter === 'All' 
    ? VENUES 
    : VENUES.filter(v => v.type === filter)

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
            <Link
              key={venue.id}
              href={`/venues/${venue.slug}`}
              className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition"
            >
              <img src={venue.cover} alt={venue.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="font-bold text-sm">{venue.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{venue.type}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {venue.followers.toLocaleString()} followers
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}