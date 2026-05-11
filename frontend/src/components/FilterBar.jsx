import React from 'react'

export default function FilterBar({ filter, onChange }) {
  const options = [
    { value: 'todos', label: '🐾 Todos' },
    { value: 'perros', label: '🐕 Perros' },
    { value: 'gatos', label: '🐈 Gatos' },
  ]

  return (
    <div className="flex gap-2 px-4 py-2 bg-white">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
            filter === opt.value
              ? 'gradient-paw text-white shadow-md'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
