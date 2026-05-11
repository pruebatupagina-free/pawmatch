import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AnimalCard({ animal }) {
  const navigate = useNavigate()

  const energyIcons = Array(5).fill('🐾').map((icon, i) => (
    <span key={i} className={i < animal.energy ? 'opacity-100' : 'opacity-20'}>{icon}</span>
  ))
  const affectionIcons = Array(5).fill('❤️').map((icon, i) => (
    <span key={i} className={i < animal.affection ? 'opacity-100' : 'opacity-20'}>{icon}</span>
  ))

  const traitColors = [
    'bg-pink-100 text-pink-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-green-100 text-green-700',
    'bg-blue-100 text-blue-700'
  ]

  return (
    <div className="w-full h-full bg-white rounded-3xl overflow-hidden card-shadow flex flex-col">
      {/* Photo section */}
      <div className="relative flex-shrink-0" style={{ height: '55%' }}>
        <img
          src={animal.photos?.[0] || 'https://placehold.co/400x300?text=🐾'}
          alt={animal.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* Name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h2 className="font-display text-white text-3xl font-black leading-none">{animal.name}</h2>
          <p className="text-white/80 text-sm font-medium">{animal.age} · {animal.breed}</p>
        </div>
        {/* Type badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
          {animal.type === 'perros' ? '🐕 Perro' : '🐈 Gato'}
        </div>
      </div>

      {/* Info section */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Story */}
        <p className="text-gray-600 text-sm leading-relaxed italic">"{animal.story}"</p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5">
          {animal.traits?.map((t, i) => (
            <span key={t} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${traitColors[i % traitColors.length]}`}>
              {t}
            </span>
          ))}
        </div>

        {/* Energy & Affection */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-50 rounded-xl p-2">
            <p className="text-xs text-orange-600 font-semibold mb-1">Energía</p>
            <div className="flex gap-0.5 text-sm">{energyIcons}</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-2">
            <p className="text-xs text-pink-600 font-semibold mb-1">Cariño</p>
            <div className="flex gap-0.5 text-sm">{affectionIcons}</div>
          </div>
        </div>

        {/* Compatibility */}
        <div className="flex gap-2">
          <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${animal.kidsOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {animal.kidsOk ? '✅' : '⚠️'} Niños
          </span>
          <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${animal.petsOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {animal.petsOk ? '✅' : '⚠️'} Otras mascotas
          </span>
        </div>

        {/* Shelter + Adopt button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-xs text-gray-400">Refugio</p>
            <p className="text-sm font-semibold text-paw-dark">{animal.shelter?.name}</p>
          </div>
          <button
            onClick={() => navigate(`/adoptar/${animal._id}`, { state: { animal } })}
            className="gradient-paw text-white px-4 py-2 rounded-full text-sm font-bold shadow"
          >
            Adoptar ❤️
          </button>
        </div>
      </div>
    </div>
  )
}
