'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Attendee = {
  id: string
  first_name: string
  last_name: string
  username: string
}

export default function AttendeesPage() {
  const params = useParams()
  const router = useRouter()
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAttendees()
  }, [])

  const fetchAttendees = async () => {
    try {
      // Get all users interested in this event
      const { data } = await supabase
        .from('interests')
        .select('user_id, users(id, first_name, last_name, username)')
        .eq('event_id', params.slug)

      const users = data?.map(d => d.users).filter(Boolean) as Attendee[]
      setAttendees(users || [])
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
        <h1 className="text-xl font-bold">Who's Going</h1>
      </header>

      <main className="px-6 py-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : attendees.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No one interested yet. Be the first!</div>
        ) : (
          <div className="space-y-3">
            {attendees.map(user => (
              <div key={user.id} className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-semibold">{user.first_name} {user.last_name}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
