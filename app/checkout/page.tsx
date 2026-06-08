'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Mock booking details - in real app these come from URL params
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
    // Mock payment processing
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-2">{booking.venue}</p>
          <p className="text-gray-400 mb-2">{booking.table}</p>
          <p className="text-gray-400 mb-8">{booking.date}</p>
          <div className="bg-gray-900 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-gray-400 mb-1">Booking Reference</p>
            <p className="font-bold text-lg">#FLO{Math.floor(Math.random() * 100000)}</p>
          </div>
          <button
            onClick={() => router.push('/feed')}
            className="w-full px-6 py-4 bg-white text-black rounded-lg font-semibold"
          >
            Back to Feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
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
            <div className="border-t border-gray-700 pt-3 mt-3">
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
                      <p className={`text-sm ${selectedMethod === method.id ? 'text-gray-600' : 'text-gray-400'}`}>
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

                {/* Crypto wallet input */}
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

        {/* Pay Button */}
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