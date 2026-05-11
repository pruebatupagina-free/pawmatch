import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MatchesPage({ matches }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm">
        <h1 className="font-display text-2xl font-black text-paw-dark">❤️ Tus Matches</h1>
        <p className="text-gray-400 text-sm">{matches.length} amigo{matches.length !== 1 ? 's' : ''} esperando</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {matches.length === 0 ? (
          <div className="text-center mt-16">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="font-display text-xl font-black text-paw-dark mb-2">Sin matches aún</h3>
            <p className="text-gray-400">¡Desliza y da like a los que te gusten!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((animal, i) => (
              <div key={`${animal._id}-${i}`} className="bg-white rounded-2xl p-4 card-shadow flex gap-4 items-center">
                <img
                  src={animal.photos?.[0]}
                  alt={animal.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-black text-paw-dark">{animal.name}</h3>
                  <p className="text-gray-400 text-sm">{animal.breed} · {animal.age}</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">{animal.shelter?.name}</p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href={`https://wa.me/52${animal.shelter?.phone}?text=Hola! Vi a ${animal.name} en PawMatch y me gustaría adoptarlo/a 🐾`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      📱 WhatsApp
                    </a>
                    <button
                      onClick={() => navigate(`/adoptar/${animal._id}`, { state: { animal } })}
                      className="gradient-paw text-white px-3 py-1 rounded-full text-xs font-bold"
                    >
                      Adoptar ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
