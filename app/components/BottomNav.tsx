'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname.startsWith(path)
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-3">
        <Link 
          href="/feed" 
          className={`flex flex-col items-center gap-1 ${isActive('/feed') ? 'text-white' : 'text-gray-500'}`}
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs font-semibold">Feed</span>
        </Link>
        
        <Link 
          href="/venues" 
          className={`flex flex-col items-center gap-1 ${isActive('/venues') ? 'text-white' : 'text-gray-500'}`}
        >
          <span className="text-2xl">🏢</span>
          <span className="text-xs font-semibold">Venues</span>
        </Link>
        
        <Link 
          href="/profile" 
          className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-white' : 'text-gray-500'}`}
        >
          <span className="text-2xl">👤</span>
          <span className="text-xs font-semibold">Profile</span>
        </Link>
      </div>
    </nav>
  )
}