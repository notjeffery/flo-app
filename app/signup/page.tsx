'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Sign up with Supabase
      const { data: auth, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
      })

      if (authErr) throw authErr

      // Create user profile
      await supabase.from('users').insert({
        id: auth.user!.id,
        email: form.email,
        phone: form.phone,
        first_name: form.firstName,
        last_name: form.lastName,
        username: `${form.firstName.toLowerCase()}${Math.floor(Math.random()*1000)}`
      })

      router.push('/interests')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center mb-8">flo</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
              required
              onChange={(e) => setForm({...form, firstName: e.target.value})}
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
              required
              onChange={(e) => setForm({...form, lastName: e.target.value})}
            />
          </div>

          <input
            type="tel"
            placeholder="+234..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            required
            onChange={(e) => setForm({...form, phone: e.target.value})}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            required
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
            required
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-black text-white border-2 border-white rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
