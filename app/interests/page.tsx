'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ARTISTS = [
  { id: '1', name: 'Burna Boy', genre: 'Afrobeats' },
  { id: '2', name: 'Wizkid', genre: 'Afrobeats' },
  { id: '3', name: 'Tems', genre: 'R&B' },
  { id: '4', name: 'Rema', genre: 'Afrobeats' },
  { id: '5', name: 'Asake', genre: 'Afrobeats' },
  { id: '6', name: 'Ayra Starr', genre: 'Afropop' },
]

const CATEGORIES = ['Nightclub', 'Rave', 'Concert', 'Comedy', 'Festival', 'Art Show']

export default function InterestsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'artists' | 'categories'>('artists')
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleArtist = (id: string) => {
    setSelectedArtists(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleContinue = () => {
    router.push('/feed')
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Customize your feed</h1>
        <p className="text-center text-gray-400 mb-8">Select artists and event types you love</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setTab('artists')}
            className={`flex-1 py-3 font-semibold transition ${
              tab === 'artists' ? 'border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Artists
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex-1 py-3 font-semibold transition ${
              tab === 'categories' ? 'border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Event Categories
          </button>
        </div>

        {/* Artists Grid */}
        {tab === 'artists' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {ARTISTS.map(artist => (
              <button
                key={artist.id}
                onClick={() => toggleArtist(artist.id)}
                className={`p-6 rounded-xl border-2 transition text-center ${
                  selectedArtists.includes(artist.id)
                    ? 'border-white bg-white text-black'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-3xl mb-2">♥</div>
                <h3 className="font-bold">{artist.name}</h3>
                <p className="text-sm text-gray-400">{artist.genre}</p>
              </button>
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {tab === 'categories' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`p-6 rounded-xl border-2 transition font-semibold ${
                  selectedCategories.includes(cat)
                    ? 'border-white bg-white text-black'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleContinue}
            className="px-6 py-3 text-gray-400 hover:text-white transition"
          >
            Skip
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-black text-white border-2 border-white rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
