'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { EVENTS } from '@/lib/events'

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const event = EVENTS.find(e => e.slug === params.slug)
  const [interested, setInterested] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [attendeeCount, setAttendeeCount] = useState(0)

  useEffect(() => {
    checkAuth()
    fetchAttendees()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUserId(user.id)
      const { data } = await supabase
        .from('interests')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_id', event?.id)
        .single()
      
      if (data) setInterested(true)
    }
  }

  const fetchAttendees = async () => {
    const { count } = await supabase
      .from('interests')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event?.id)
    
    setAttendeeCount(count || 0)
  }

  const toggleInterest = async () => {
    if (!userId) {
      router.push('/login')
      return
    }

    const newState = !interested
    setInterested(newState)

    if (newState) {
      await supabase.from('interests').insert({
        user_id: userId,
        event_id: event?.id
      })
      setAttendeeCount(attendeeCount + 1)
    } else {
      await supabase
        .from('interests')
        .delete()
        .eq('user_id', userId)
        .eq('event_id', event?.id)
      setAttendeeCount(attendeeCount - 1)
    }
  }

  if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
      </header>

      <img src={event.image} alt={event.name} className="w-full h-96 object-cover" />

      <div className="px-6 py-6 space-y-6">
        <div>
          <span className="text-xs bg-white text-black px-2 py-1 rounded">{event.type}</span>
          <h1 className="text-3xl font-bold mt-3">{event.name}</h1>
          <p className="text-gray-400 mt-2">{event.description}</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <span>{event.venue}, {event.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </p>
          {event.price && (
            <p className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <span>From ₦{event.price.toLocaleString()}</span>
            </p>
          )}
          <p className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <span>{event.genre}</span>
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-2">{attendeeCount} people interested</p>
          <Link href={`/events/${event.slug}/attendees`} className="text-sm text-white underline">
            See who's going →
          </Link>
        </div>

        <div className="space-y-3">
          <button
            onClick={toggleInterest}
            className={`w-full px-6 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              interested
                ? 'bg-white text-black'
                : 'bg-black text-white border-2 border-white'
            }`}
          >
            <span className={`text-2xl ${interested ? 'animate-ping-once' : ''}`}>
              {interested ? '❤️' : '🤍'}
            </span>
            {interested ? 'Interested' : 'Mark Interested'}
          </button>
          
          <button className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
            Book Together
          </button>
        </div>
      </div>
    </div>
  )
}
