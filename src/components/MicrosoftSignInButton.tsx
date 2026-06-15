'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export function MicrosoftSignInButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await signIn('microsoft-entra-id', { callbackUrl: '/login' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <svg className="size-5" viewBox="0 0 23 23" fill="none">
          <rect x="1" y="1" width="9" height="9" fill="white" />
          <rect x="12" y="1" width="9" height="9" fill="white" />
          <rect x="1" y="12" width="9" height="9" fill="white" />
          <rect x="12" y="12" width="9" height="9" fill="white" />
        </svg>
      )}
      {loading ? 'Conectando...' : 'Iniciar sesión con Microsoft'}
    </button>
  )
}
