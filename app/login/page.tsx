'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/utils/firebase/client'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/learning-path')
    } catch (error: any) {
      console.error('Error logging in with Google:', error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute top-10 right-10 w-64 h-64 border border-yellow-300 rounded-full opacity-40 z-0"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 tracking-tight">Gameducate</h1>
          <p className="text-slate-600 mt-2 text-sm">Membangun Literasi Digital Masa Depan</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Mulai Perjalanan<br/>Belajarmu</h2>
            <p className="text-slate-500 mt-3 text-sm">
              Masuk untuk melanjutkan perjalanan<br/>belajarmu yang menyenangkan.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-full py-3 px-4 hover:bg-slate-50 transition-colors font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Masuk dengan Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-medium tracking-wider">HANYA UNTUK PELAJAR</span>
            </div>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Data privasi Anda aman.<br/>
              Gameducate tidak akan pernah membagikan informasi profil Google Anda ke pihak ketiga.
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-slate-600 border-t border-slate-100 pt-6">
            Belum memiliki akun?{' '}
            <Link href="/register" className="text-blue-700 font-semibold hover:underline">
              Daftar
            </Link>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex gap-6 text-sm text-slate-500">
          <Link href="#" className="hover:text-slate-800 transition-colors">Bantuan</Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">Privasi</Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">Ketentuan</Link>
        </div>
      </div>
    </div>
  )
}
