import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import SwipePage from './pages/SwipePage.jsx'
import MatchesPage from './pages/MatchesPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdoptionForm from './pages/AdoptionForm.jsx'
import confetti from 'canvas-confetti'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export default function App() {
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('pawmatch_matches')
    return saved ? JSON.parse(saved) : []
  })
  const [showMatch, setShowMatch] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const addMatch = (animal) => {
    const updated = [...matches, animal]
    setMatches(updated)
    localStorage.setItem('pawmatch_matches', JSON.stringify(updated))
    setShowMatch(animal)
    confetti({
      particleCount: 150,
      spread: 80,
      colors: ['#FF6B9D', '#9B59B6', '#FF8C42', '#FFF5E6'],
      origin: { y: 0.6 }
    })
    setTimeout(() => setShowMatch(null), 3000)
  }

  const tabs = [
    { path: '/', icon: '🐾', label: 'Explorar' },
    { path: '/matches', icon: '❤️', label: 'Matches', badge: matches.length },
    { path: '/chat', icon: '💬', label: 'Chat' },
    { path: '/perfil', icon: '👤', label: 'Perfil' },
  ]

  const isHidden = location.pathname.startsWith('/adoptar')

  return (
    <div className="min-h-screen bg-paw-cream flex flex-col max-w-md mx-auto relative">
      {/* Match overlay */}
      {showMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display text-3xl font-black text-paw-dark mb-2">¡Es un Match!</h2>
            <p className="text-gray-500 mb-4">Le diste like a <strong>{showMatch.name}</strong></p>
            <img
              src={showMatch.photos?.[0]}
              alt={showMatch.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-paw-pink"
            />
            <p className="text-paw-pink font-semibold text-sm">Visita tu tab de Matches para contactar al refugio ❤️</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<SwipePage backendUrl={BACKEND_URL} onMatch={addMatch} />} />
          <Route path="/matches" element={<MatchesPage matches={matches} />} />
          <Route path="/chat" element={<ChatPage backendUrl={BACKEND_URL} />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/adoptar/:animalId" element={<AdoptionForm backendUrl={BACKEND_URL} />} />
        </Routes>
      </div>

      {/* Bottom nav */}
      {!isHidden && (
        <nav className="bg-white border-t border-gray-100 flex items-stretch shadow-lg">
          {tabs.map(tab => {
            const active = location.pathname === tab.path
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 relative transition-all ${active ? 'text-paw-pink' : 'text-gray-400'}`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs font-semibold">{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="absolute top-2 right-1/4 bg-paw-pink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}
