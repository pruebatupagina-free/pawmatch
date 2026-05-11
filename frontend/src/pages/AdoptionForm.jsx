import React, { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

export default function AdoptionForm({ backendUrl }) {
  const { animalId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const animal = location.state?.animal || { name: 'este animal', shelter: {} }
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    address: '', housing: 'casa', hasYard: false,
    hasKids: false, kidsAges: '', hasPets: false, petDetails: '',
    experience: 'ninguna', workHours: '8', reason: '',
    commitment: false, references: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const submit = async () => {
    setLoading(true)
    try {
      await axios.post(`${backendUrl}/api/adoption`, { animalId, ...form })
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-paw-cream">
      <div className="text-center">
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="font-display text-3xl font-black text-paw-dark mb-3">¡Solicitud enviada!</h2>
        <p className="text-gray-500 mb-2">El refugio revisará tu solicitud y te contactará en las próximas 48 horas.</p>
        <p className="text-gray-400 text-sm mb-6">Por favor revisa tu email: <strong>{form.email}</strong></p>
        <button onClick={() => navigate('/')} className="gradient-paw text-white px-8 py-3 rounded-full font-bold">
          Seguir explorando 🐾
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-paw-cream flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm flex items-center gap-3">
        <button
          onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}
          className="text-gray-400 text-xl"
        >
          ←
        </button>
        <div>
          <h1 className="font-display text-xl font-black text-paw-dark">Formulario de adopción</h1>
          <p className="text-gray-400 text-xs">{animal.name} · Paso {step} de 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white px-4 pb-3">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${(step / 3) * 100}%`, background: 'linear-gradient(90deg, #FF6B9D, #9B59B6)' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black text-paw-dark">Datos personales</h2>
            {[
              { label: 'Nombre completo', field: 'name', placeholder: 'Juan Pérez' },
              { label: 'Email', field: 'email', placeholder: 'juan@email.com', type: 'email' },
              { label: 'Teléfono / WhatsApp', field: 'phone', placeholder: '81 1234 5678', type: 'tel' },
              { label: 'Ciudad', field: 'city', placeholder: 'Monterrey, NL' },
            ].map(({ label, field, placeholder, type }) => (
              <div key={field}>
                <label className="text-xs text-gray-500 font-semibold">{label}</label>
                <input
                  type={type || 'text'}
                  value={form[field]}
                  onChange={e => update(field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full mt-1 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30 card-shadow"
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black text-paw-dark">Tu hogar</h2>

            <div>
              <label className="text-xs text-gray-500 font-semibold">Tipo de vivienda</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['casa', 'departamento', 'rancho'].map(h => (
                  <button
                    key={h}
                    onClick={() => update('housing', h)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize ${form.housing === h ? 'gradient-paw text-white' : 'bg-white text-gray-500 card-shadow'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {[
              { field: 'hasYard', label: '¿Tienes jardín o patio?' },
              { field: 'hasKids', label: '¿Viven niños en casa?' },
              { field: 'hasPets', label: '¿Tienes otras mascotas?' },
            ].map(({ field, label }) => (
              <div key={field} className="flex items-center justify-between bg-white rounded-xl p-3 card-shadow">
                <p className="text-sm font-semibold text-paw-dark">{label}</p>
                <button
                  onClick={() => update(field, !form[field])}
                  className={`w-12 h-6 rounded-full transition-all relative ${form[field] ? 'bg-paw-pink' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form[field] ? 'right-0.5' : 'left-0.5'} shadow`} />
                </button>
              </div>
            ))}

            <div>
              <label className="text-xs text-gray-500 font-semibold">Horas que el animal estaría solo</label>
              <input
                type="number"
                min="0"
                max="24"
                value={form.workHours}
                onChange={e => update('workHours', e.target.value)}
                className="w-full mt-1 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30 card-shadow"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-black text-paw-dark">¿Por qué adoptar?</h2>

            <div>
              <label className="text-xs text-gray-500 font-semibold">Experiencia previa con mascotas</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['ninguna', 'algo', 'mucha'].map(exp => (
                  <button
                    key={exp}
                    onClick={() => update('experience', exp)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize ${form.experience === exp ? 'gradient-paw text-white' : 'bg-white text-gray-500 card-shadow'}`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-semibold">¿Por qué quieres adoptar a {animal.name}?</label>
              <textarea
                value={form.reason}
                onChange={e => update('reason', e.target.value)}
                rows={4}
                placeholder="Cuéntanos un poco sobre ti y por qué crees que serías el hogar ideal..."
                className="w-full mt-1 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30 card-shadow resize-none"
              />
            </div>

            {[
              { field: 'commitment', label: 'Me comprometo a asumir todos los gastos veterinarios', icon: '🏥' },
              { field: 'references', label: 'Acepto que el refugio verifique mis referencias', icon: '✅' },
            ].map(({ field, label, icon }) => (
              <div
                key={field}
                onClick={() => update(field, !form[field])}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${form[field] ? 'bg-pink-50 border border-paw-pink/30' : 'bg-white card-shadow'}`}
              >
                <span className="text-xl flex-shrink-0">{icon}</span>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{label}</p>
                <span className="flex-shrink-0 text-lg">{form[field] ? '✅' : '⬜'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer button */}
      <div className="p-4 bg-white border-t border-gray-100">
        {step < 3 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={step === 1 && (!form.name || !form.email || !form.phone)}
            className="w-full gradient-paw text-white py-3 rounded-2xl font-bold disabled:opacity-50"
          >
            Continuar →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!form.commitment || !form.references || loading}
            className="w-full gradient-paw text-white py-3 rounded-2xl font-bold disabled:opacity-50"
          >
            {loading ? 'Enviando...' : '🐾 Enviar solicitud de adopción'}
          </button>
        )}
      </div>
    </div>
  )
}
