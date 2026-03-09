
'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const [dissolving, setDissolving] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {

      setDissolving(true)

      setTimeout(() => router.push('/signup'), 800)

    }, 2000)

    return () => clearTimeout(timer)

  }, [router])

  return (

    <main className={`min-h-screen flex items-center justify-center ${dissolving ? 'animate-dissolve' : ''}`}>

      <h1 className="text-9xl font-bold">flo</h1>

    </main>

  )

}

