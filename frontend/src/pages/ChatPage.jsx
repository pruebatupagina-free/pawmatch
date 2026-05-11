import React, { useState, useEffect, useRef } from 'react'

export default function ChatPage({ backendUrl }) {
  const [messages, setMessages] = useState([
    { from: 'shelter', name: 'Refugio Patitas Felices', text: '¡Hola! Somos el equipo de adopciones. ¿En qué te podemos ayudar? 🐾', time: '10:30' },
    { from: 'me', text: 'Hola! Me interesa saber más sobre Mochi', time: '10:31' },
    { from: 'shelter', name: 'Refugio Patitas Felices', text: 'Con gusto! Mochi es un gato muy tranquilo, ideal para apartamentos. ¿Tienes experiencia con gatos? 😊', time: '10:32' },
  ])
  const [input, setInput] = useState('')
  const messagesEnd = useRef(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages(prev => [...prev, { from: 'me', text: input, time }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'shelter',
        name: 'Refugio Patitas Felices',
        text: 'Gracias por tu mensaje. Te responderemos pronto 🐾 También puedes contactarnos por WhatsApp para respuesta inmediata.',
        time: `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, '0')}`
      }])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 gradient-paw rounded-full flex items-center justify-center text-xl">🐾</div>
        <div>
          <h1 className="font-display text-lg font-black text-paw-dark">Chat con Refugios</h1>
          <p className="text-green-500 text-xs font-semibold">● En línea</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
              msg.from === 'me'
                ? 'gradient-paw text-white rounded-tr-sm'
                : 'bg-white text-gray-700 rounded-tl-sm card-shadow'
            }`}>
              {msg.from === 'shelter' && <p className="text-xs font-bold text-paw-pink mb-1">{msg.name}</p>}
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-white/60' : 'text-gray-400'} text-right`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEnd} />
      </div>

      <div className="bg-white border-t border-gray-100 p-3 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-paw-pink/30"
        />
        <button onClick={send} className="w-10 h-10 gradient-paw rounded-full flex items-center justify-center text-white font-bold">
          ➤
        </button>
      </div>
    </div>
  )
}
