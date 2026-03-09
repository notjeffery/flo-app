'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type User = {
  first_name: string
  last_name: string
  username: string
  email: string
  phone: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      setUser(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="w-8"></div>
      </header>

      <main className="px-6 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
          <p className="text-gray-400">@{user?.username}</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">Phone</p>
            <p className="font-semibold">{user?.phone}</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3 mb-8">
          <Link 
            href="/profile/interested-events" 
            className="block bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">My Interested Events</span>
              <span>→</span>
            </div>
          </Link>
          
          <Link 
            href="/profile/friends" 
            className="block bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Friends</span>
              <span>→</span>
            </div>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-4 bg-red-900/20 text-red-500 border-2 border-red-500 rounded-lg font-semibold hover:bg-red-900/30 transition"
        >
          Logout
        </button>
      </main>
    </div>
  )
}
