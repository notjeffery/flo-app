
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { EVENTS } from '@/lib/events'

export default function InterestedEventsPage() {
  const router = useRouter()
  const [interestedEvents, setInterestedEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterestedEvents()
  }, [])

  const fetchInterestedEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('interests')
        .select('event_id')
        .eq('user_id', user.id)

      const eventIds = data?.map(d => d.event_id) || []
      const myEvents = EVENTS.filter(e => eventIds.includes(e.id))
      setInterestedEvents(myEvents)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">My Interested Events</h1>
      </header>

      <main className="px-6 py-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : interestedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No events yet</p>
            <Link href="/feed" className="text-white underline">Explore events</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {interestedEvents.map(event => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="block bg-gray-900 rounded-2xl overflow-hidden hover:opacity-90 transition"
              >
                <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-white text-black px-2 py-1 rounded">{event.type}</span>
                  <h3 className="font-bold text-lg mt-2">{event.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">📍 {event.venue}</p>
                  <p className="text-sm text-gray-400">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                  {event.price && <p className="text-sm font-semibold mt-2">₦{event.price.toLocaleString()}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}