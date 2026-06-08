'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Table = {
  id: string
  section: string
  number: number
  capacity: number
  price: number
  available: boolean
}

type Props = {
  tables: Table[]
  venueName: string
}

export default function FloorPlan({ tables, venueName }: Props) {
  const router = useRouter()
  const [view, setView] = useState<'floor' | 'list'>('floor')
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  const handleSelect = (table: Table) => {
    if (!table.available) return
    setSelectedTable(selectedTable?.id === table.id ? null : table)
  }

  const getColor = (table: Table) => {
    if (!table.available) return '#ef4444'
    if (selectedTable?.id === table.id) return '#facc15'
    return '#22c55e'
  }

  const getTextColor = (table: Table) => {
    if (!table.available) return '#fff'
    if (selectedTable?.id === table.id) return '#000'
    return '#000'
  }

  const sections = [...new Set(tables.map(t => t.section))]

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tables</h2>
        <div className="flex bg-gray-900 rounded-lg p-1 gap-1">
          <button
            onClick={() => setView('floor')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              view === 'floor' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            🗺 Floor Plan
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              view === 'list' ? 'bg-white text-black' : 'text-gray-400'
            }`}
          >
            ☰ List
          </button>
        </div>
      </div>

      {/* Floor Plan View */}
      {view === 'floor' && (
        <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '16px' }}>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#aaa' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div> Available
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#aaa' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div> Booked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#aaa' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#facc15' }}></div> Selected
            </div>
          </div>

          <svg viewBox="0 0 700 500" style={{ width: '100%', borderRadius: '12px', border: '1px solid #222' }}>
            <rect width="700" height="500" fill="#111" rx="12"/>
            <rect x="10" y="10" width="680" height="480" rx="10" fill="none" stroke="#333" strokeWidth="1.5"/>

            {/* DJ Booth */}
            <rect x="270" y="20" width="160" height="55" rx="8" fill="#1a1a2e" stroke="#4444aa" strokeWidth="1.5"/>
            <text x="350" y="42" textAnchor="middle" fontSize="11" fill="#8888ff" fontWeight="600">DJ BOOTH</text>
            <text x="350" y="58" textAnchor="middle" fontSize="10" fill="#555">& STAGE</text>

            {/* Dance Floor */}
            <rect x="180" y="90" width="340" height="160" rx="8" fill="#161616" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4,3"/>
            <text x="350" y="168" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600">DANCE FLOOR</text>

            {/* Bar Left */}
            <rect x="15" y="90" width="50" height="200" rx="6" fill="#1a1000" stroke="#6b4a00" strokeWidth="1.5"/>
            <text x="40" y="185" textAnchor="middle" fontSize="10" fill="#b8860b" fontWeight="600" transform="rotate(-90,40,185)">BAR</text>

            {/* Bar Right */}
            <rect x="635" y="90" width="50" height="200" rx="6" fill="#1a1000" stroke="#6b4a00" strokeWidth="1.5"/>
            <text x="660" y="185" textAnchor="middle" fontSize="10" fill="#b8860b" fontWeight="600" transform="rotate(90,660,185)">BAR</text>

            {/* Balcony label */}
            <text x="350" y="475" textAnchor="middle" fontSize="11" fill="#555">BALCONY SECTION</text>

            {/* VIP Tables */}
            {tables.filter(t => t.section === 'VIP').map((table, i) => {
              const positions = [
                { cx: 120, cy: 130 },
                { cx: 210, cy: 90 },
                { cx: 490, cy: 90 },
                { cx: 580, cy: 130 },
              ]
              const pos = positions[i] || { cx: 120 + i * 80, cy: 130 }
              return (
                <g key={table.id} onClick={() => handleSelect(table)} style={{ cursor: table.available ? 'pointer' : 'not-allowed' }}>
                  <circle cx={pos.cx} cy={pos.cy} r="28" fill={getColor(table)}/>
                  <text x={pos.cx} y={pos.cy - 4} textAnchor="middle" fontSize="10" fill={getTextColor(table)} fontWeight="700">
                    VIP {table.number}
                  </text>
                  <text x={pos.cx} y={pos.cy + 9} textAnchor="middle" fontSize="9" fill={getTextColor(table)}>
                    {table.available ? `${table.capacity} ppl` : 'Booked'}
                  </text>
                </g>
              )
            })}

            {/* Regular Tables */}
            {tables.filter(t => t.section === 'Regular').map((table, i) => {
              const positions = [
                { cx: 100, cy: 290 },
                { cx: 220, cy: 315 },
                { cx: 350, cy: 325 },
                { cx: 480, cy: 315 },
                { cx: 600, cy: 290 },
              ]
              const pos = positions[i] || { cx: 100 + i * 100, cy: 300 }
              return (
                <g key={table.id} onClick={() => handleSelect(table)} style={{ cursor: table.available ? 'pointer' : 'not-allowed' }}>
                  <circle cx={pos.cx} cy={pos.cy} r="26" fill={getColor(table)}/>
                  <text x={pos.cx} y={pos.cy - 4} textAnchor="middle" fontSize="10" fill={getTextColor(table)} fontWeight="700">
                    REG {table.number}
                  </text>
                  <text x={pos.cx} y={pos.cy + 9} textAnchor="middle" fontSize="9" fill={getTextColor(table)}>
                    {table.available ? `${table.capacity} ppl` : 'Booked'}
                  </text>
                </g>
              )
            })}

            {/* Balcony Tables */}
            {tables.filter(t => t.section === 'Balcony').map((table, i) => {
              const positions = [
                { x: 80, y: 400 },
                { x: 270, y: 400 },
                { x: 460, y: 400 },
              ]
              const pos = positions[i] || { x: 80 + i * 200, y: 400 }
              return (
                <g key={table.id} onClick={() => handleSelect(table)} style={{ cursor: table.available ? 'pointer' : 'not-allowed' }}>
                  <rect x={pos.x} y={pos.y} width="100" height="40" rx="8" fill={getColor(table)}/>
                  <text x={pos.x + 50} y={pos.y + 16} textAnchor="middle" fontSize="10" fill={getTextColor(table)} fontWeight="700">
                    BAL {table.number}
                  </text>
                  <text x={pos.x + 50} y={pos.y + 30} textAnchor="middle" fontSize="9" fill={getTextColor(table)}>
                    {table.available ? `${table.capacity} ppl · ₦${(table.price/1000)}k` : 'Booked'}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Selected Table Info */}
          {selectedTable && (
            <div style={{ marginTop: '16px', background: '#111', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>
                {selectedTable.section} Table {selectedTable.number}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid #1e1e1e', color: '#aaa' }}>
                <span>Capacity</span><span style={{ color: '#fff' }}>Up to {selectedTable.capacity} people</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: '#aaa' }}>
                <span>Price</span><span style={{ color: '#fff', fontWeight: '600' }}>₦{selectedTable.price.toLocaleString()}</span>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                style={{ marginTop: '12px', width: '100%', padding: '12px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
              >
                Reserve This Table — ₦{selectedTable.price.toLocaleString()}
              </button>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-6">
          {sections.map(section => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">{section}</h3>
              <div className="space-y-3">
                {tables.filter(t => t.section === section).map(table => (
                  <button
                    key={table.id}
                    onClick={() => handleSelect(table)}
                    disabled={!table.available}
                    className={`w-full text-left rounded-xl p-4 transition border-2 ${
                      !table.available
                        ? 'bg-gray-900 opacity-50 cursor-not-allowed border-transparent'
                        : selectedTable?.id === table.id
                        ? 'bg-white text-black border-white'
                        : 'bg-gray-900 hover:bg-gray-800 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">Table {table.number}</h4>
                        <p className={`text-sm ${selectedTable?.id === table.id ? 'text-gray-600' : 'text-gray-400'}`}>
                          Up to {table.capacity} people
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₦{table.price.toLocaleString()}</p>
                        <p className={`text-xs ${table.available ? selectedTable?.id === table.id ? 'text-green-600' : 'text-green-400' : 'text-red-400'}`}>
                          {table.available ? '✓ Available' : '✗ Booked'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky Book Button for List View */}
      {view === 'list' && selectedTable && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-6 py-4 z-50">
          <button
            onClick={() => router.push('/checkout')}
            className="w-full px-6 py-4 bg-white text-black rounded-lg font-bold text-lg"
          >
            Book Table — ₦{selectedTable.price.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  )
}