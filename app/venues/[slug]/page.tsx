'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { VENUES } from '@/lib/venues'
import { EVENTS } from '@/lib/events'

export default function VenuePage() {
  const params = useParams()
  const router = useRouter()
  const venue = VENUES.find(v => v.slug === params.slug)
  const [following, setFollowing] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  
  if (!venue) return <div className="min-h-screen flex items-center justify-center">Venue not found</div>

  const upcomingEvents = EVENTS.filter(e => 
    e.venue.toLowerCase().includes(venue.name.toLowerCase())
  )

  const sections = [...new Set(venue.tables.map(t => t.section))]

  const handleTableSelect = (tableId: string, available: boolean) => {
    if (!available) return
    setSelectedTable(selectedTable === tableId ? null : tableId)
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4 z-50">
        <button onClick={() => router.back()} className="text-2xl">←</button>
      </header>

      {/* Cover */}
      <img src={venue.cover} alt={venue.name} className="w-full h-64 object-cover" />

      {/* Venue Info */}
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

        {/* Tables Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Available Tables</h2>
          
          {sections.map(section => (
            <div key={section} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">{section}</h3>
              <div className="space-y-3">
                {venue.tables
                  .filter(t => t.section === section)
                  .map(table => (
                    <button
                      key={table.id}
                      onClick={() => handleTableSelect(table.id, table.available)}
                      disabled={!table.available}
                      className={`w-full text-left rounded-xl p-4 transition ${
                        !table.available 
                          ? 'bg-gray-900 opacity-50 cursor-not-allowed' 
                          : selectedTable === table.id
                          ? 'bg-white text-black border-2 border-white'
                          : 'bg-gray-900 hover:bg-gray-800 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">Table {table.number}</h4>
                          <p className={`text-sm ${selectedTable === table.id ? 'text-gray-800' : 'text-gray-400'}`}>
                            Up to {table.capacity} people
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₦{table.price.toLocaleString()}</p>
                          <p className={`text-xs ${
                            table.available 
                              ? selectedTable === table.id ? 'text-green-600' : 'text-green-400'
                              : 'text-red-400'
                          }`}>
                            {table.available ? '✓ Available' : '✗ Booked'}
                          </p>
                        </div>
                      </div>
                      {selectedTable === table.id && (
                        <div className="mt-2 pt-2 border-t border-gray-700">
                          <p className="text-xs font-semibold">Selected - Ready to book</p>
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Book Button */}
        {selectedTable && (
          <div className="sticky bottom-0 bg-black pt-4 pb-6 -mx-6 px-6 border-t border-gray-800">
            <button className="w-full px-6 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-200 transition">
              Book Table - ₦{venue.tables.find(t => t.id === selectedTable)?.price.toLocaleString()}
            </button>
          </div>
        )}

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