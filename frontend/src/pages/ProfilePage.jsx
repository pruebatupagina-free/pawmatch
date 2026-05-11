import React, { useState } from 'react'

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('pawmatch_profile')
    return saved ? JSON.parse(saved) : {
      name: 'Mi Perfil',
      city: 'Monterrey',
      hasKids: false,
      hasPets: false,
      size: 'todos',
      experience: 'ninguna',
    }
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('pawmatch_profile', JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm">
        <h1 className="font-display text-2xl font-black text-paw-dark">👤 Mi Perfil</h1>
        <p className="text-gray-400 text-sm">Personaliza tu experiencia de adopción</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Avatar */}
        <div className="bg-white rounded-2xl p-4 card-shadow text-center">
          <div className="w-20 h-20 gradient-paw rounded-full flex items-center justify-center text-4xl mx-auto mb-3">🐾</div>
          <h2 className="font-display text-xl font-black text-paw-dark">{profile.name || 'Adoptante'}</h2>
          <p className="text-gray-400 text-sm">{profile.city}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-4 card-shadow space-y-4">
          <h3 className="font-display font-black text-paw-dark">Información personal</h3>

          <div>
            <label className="text-xs text-gray-500 font-semibold">Nombre</label>
            <input
              value={profile.name}
              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
              className="w-full mt-1 bg-gray-50 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-semibold">Ciudad</label>
            <input
              value={profile.city}
              onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
              className="w-full mt-1 bg-gray-50 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30"
              placeholder="Tu ciudad"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-4 card-shadow space-y-4">
          <h3 className="font-display font-black text-paw-dark">Preferencias</h3>

          <div>
            <label className="text-xs text-gray-500 font-semibold">Tamaño preferido</label>
            <div className="flex gap-2 mt-2">
              {['todos', 'pequeño', 'mediano', 'grande'].map(s => (
                <button
                  key={s}
                  onClick={() => setProfile(p => ({ ...p, size: s }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${profile.size === s ? 'gradient-paw text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-semibold">Experiencia con mascotas</label>
            <div className="flex gap-2 mt-2">
              {['ninguna', 'algo', 'mucha'].map(exp => (
                <button
                  key={exp}
                  onClick={() => setProfile(p => ({ ...p, experience: exp }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${profile.experience === exp ? 'gradient-paw text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-paw-dark">¿Tienes niños?</p>
              <p className="text-xs text-gray-400">Para ver animales compatibles</p>
            </div>
            <button
              onClick={() => setProfile(p => ({ ...p, hasKids: !p.hasKids }))}
              className={`w-12 h-6 rounded-full transition-all relative ${profile.hasKids ? 'bg-paw-pink' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${profile.hasKids ? 'right-0.5' : 'left-0.5'} shadow`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-paw-dark">¿Tienes otras mascotas?</p>
              <p className="text-xs text-gray-400">Para ver animales compatibles</p>
            </div>
            <button
              onClick={() => setProfile(p => ({ ...p, hasPets: !p.hasPets }))}
              className={`w-12 h-6 rounded-full transition-all relative ${profile.hasPets ? 'bg-paw-pink' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${profile.hasPets ? 'right-0.5' : 'left-0.5'} shadow`} />
            </button>
          </div>
        </div>

        <button
          onClick={save}
          className={`w-full py-3 rounded-2xl font-bold transition-all ${saved ? 'bg-green-500 text-white' : 'gradient-paw text-white'}`}
        >
          {saved ? '✅ ¡Guardado!' : 'Guardar perfil'}
        </button>

        <div className="text-center text-xs text-gray-400 pb-4">
          PawMatch v1.0 · Hecho con ❤️ para los animales
        </div>
      </div>
    </div>
  )
}
