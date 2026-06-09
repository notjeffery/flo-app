'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PAYMENT_METHODS = [
  {
    id: 'paystack',
    name: 'Paystack',
    description: 'Pay with card, bank transfer or USSD',
    icon: '💳',
    tag: 'Most Popular'
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    description: 'Pay with card, mobile money or bank',
    icon: '🌊',
    tag: 'Recommended'
  },
  {
    id: 'crypto',
    name: 'Crypto',
    description: 'Pay with USDT, BTC or ETH',
    icon: '₿',
    tag: 'For Large Payments'
  },
]

const HOTELS = [
  {
    id: '1',
    name: 'Eko Hotel & Suites',
    distance: '2 mins from venue',
    price: 85000,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    tag: 'Most Popular'
  },
  {
    id: '2',
    name: 'Federal Palace Hotel',
    distance: '5 mins from venue',
    price: 65000,
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    tag: 'Best Value'
  },
  {
    id: '3',
    name: 'Intercontinental Lagos',
    distance: '8 mins from venue',
    price: 120000,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    tag: 'Premium'
  },
]

const CONCIERGE = [
  {
    id: '1',
    name: 'Private Driver',
    description: 'Luxury car pickup & drop off',
    price: 25000,
    icon: '🚗'
  },
  {
    id: '2',
    name: 'VIP Bottle Service',
    description: 'Pre-order your bottles',
    price: 150000,
    icon: '🍾'
  },
  {
    id: '3',
    name: 'Event Photographer',
    description: 'Personal photographer for the night',
    price: 50000,
    icon: '📸'
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [selectedConcierge, setSelectedConcierge] = useState<string[]>([])

  const booking = {
    venue: 'Quilox',
    table: 'VIP Table 1',
    capacity: '8 people',
    date: 'Saturday, March 28 2026',
    price: 500000,
    serviceFee: 25000,
    total: 525000,
  }

  const handlePayment = async () => {
    if (!selectedMethod) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }

  const toggleConcierge = (id: string) => {
    setSelectedConcierge(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  if (success) {
    return (
      <div className="min-h-screen pb-20">
        <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4">
          <h1 className="text-xl font-bold">Booking Confirmed!</h1>
        </header>

        <main className="px-6 py-6 space-y-8">
          {/* Success Banner */}
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">You're in!</h2>
            <p className="text-gray-400 mb-1">{booking.venue} · {booking.table}</p>
            <p className="text-gray-400">{booking.date}</p>
            <div className="bg-gray-900 rounded-xl p-4 mt-4 inline-block">
              <p className="text-sm text-gray-400">Booking Reference</p>
              <p className="font-bold text-lg">#FLO{Math.floor(Math.random() * 100000)}</p>
            </div>
          </div>

          {/* Complete Your Night */}
          <div>
            <h2 className="text-xl font-bold mb-1">Complete Your Night 🔑</h2>
            <p className="text-sm text-gray-400 mb-4">
              Flo recommends the best hotels and services near your venue
            </p>

            {/* Hotel Recommendations */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
              Hotels Near {booking.venue}
            </h3>
            <div className="space-y-3 mb-6">
              {HOTELS.map(hotel => (
                <button
                  key={hotel.id}
                  onClick={() => setSelectedHotel(
                    selectedHotel === hotel.id ? null : hotel.id
                  )}
                  className={`w-full text-left rounded-xl overflow-hidden border-2 transition ${
                    selectedHotel === hotel.id
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className={`p-4 ${selectedHotel === hotel.id ? 'bg-white text-black' : 'bg-gray-900'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded mb-2 inline-block ${
                          selectedHotel === hotel.id
                            ? 'bg-black text-white'
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {hotel.tag}
                        </span>
                        <h4 className="font-bold">{hotel.name}</h4>
                        <p className={`text-sm ${selectedHotel === hotel.id ? 'text-gray-600' : 'text-gray-400'}`}>
                          📍 {hotel.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₦{hotel.price.toLocaleString()}</p>
                        <p className={`text-xs ${selectedHotel === hotel.id ? 'text-gray-600' : 'text-gray-400'}`}>
                          per night
                        </p>
                        <p className="text-sm">⭐ {hotel.rating}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Concierge Services */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
              Concierge Services
            </h3>
            <div className="space-y-3 mb-6">
              {CONCIERGE.map(service => (
                <button
                  key={service.id}
                  onClick={() => toggleConcierge(service.id)}
                  className={`w-full text-left rounded-xl p-4 border-2 transition ${
                    selectedConcierge.includes(service.id)
                      ? 'border-white bg-white text-black'
                      : 'border-transparent bg-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <p className="font-bold">{service.name}</p>
                        <p className={`text-sm ${
                          selectedConcierge.includes(service.id)
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">₦{service.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Add to booking button */}
            {(selectedHotel || selectedConcierge.length > 0) && (
              <button
                onClick={() => router.push('/feed')}
                className="w-full px-6 py-4 bg-white text-black rounded-lg font-bold text-lg mb-3"
              >
                Add to My Night 🔑
              </button>
            )}

            <button
              onClick={() => router.push('/feed')}
              className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg font-semibold"
            >
              Back to Feed
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-black border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Booking Summary */}
        <div className="bg-gray-900 rounded-2xl p-5">
          <h2 className="font-bold text-lg mb-4">Booking Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Venue</span>
              <span className="font-semibold">{booking.venue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Table</span>
              <span className="font-semibold">{booking.table}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Capacity</span>
              <span className="font-semibold">{booking.capacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="font-semibold">{booking.date}</span>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Table Price</span>
                <span>₦{booking.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-400">Service Fee</span>
                <span>₦{booking.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-3 text-lg font-bold">
                <span>Total</span>
                <span>₦{booking.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full text-left rounded-xl p-4 border-2 transition ${
                  selectedMethod === method.id
                    ? 'border-white bg-white text-black'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-bold">{method.name}</p>
                      <p className={`text-sm ${
                        selectedMethod === method.id
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      }`}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedMethod === method.id
                      ? 'bg-black text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {method.tag}
                  </span>
                </div>

                {selectedMethod === 'crypto' && method.id === 'crypto' && (
                  <div className="mt-4 space-y-3" onClick={e => e.stopPropagation()}>
                    <div>
                      <p className="text-sm font-semibold text-black mb-2">Select Currency</p>
                      <div className="flex gap-2">
                        {['USDT', 'BTC', 'ETH'].map(coin => (
                          <button key={coin} className="px-3 py-1 bg-black text-white rounded-lg text-sm font-semibold">
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black mb-1">Wallet Address</p>
                      <p className="text-xs bg-gray-100 text-black p-2 rounded font-mono break-all">
                        0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedMethod || loading}
          className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition ${
            selectedMethod && !loading
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing...' : `Pay ₦${booking.total.toLocaleString()}`}
        </button>

        <p className="text-center text-xs text-gray-500">
          🔒 Your payment is secured and encrypted
        </p>
      </main>
    </div>
  )
}