import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import AnimalCard from '../components/AnimalCard.jsx'
import FilterBar from '../components/FilterBar.jsx'

export default function SwipePage({ backendUrl, onMatch }) {
  const [animals, setAnimals] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const dragStart = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    fetchAnimals()
  }, [filter])

  const fetchAnimals = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${backendUrl}/api/animals?type=${filter}`)
      setAnimals(res.data)
      setCurrentIndex(0)
    } catch {
      setAnimals(getSeedAnimals().filter(a => filter === 'todos' || a.type === filter))
      setCurrentIndex(0)
    }
    setLoading(false)
  }

  const handleDragStart = (e) => {
    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX
    setDragging(true)
  }

  const handleDragMove = (e) => {
    if (!dragging || dragStart.current === null) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const diff = clientX - dragStart.current
    setDragX(diff)
  }

  const handleDragEnd = () => {
    if (Math.abs(dragX) > 100) {
      if (dragX > 0) handleLike()
      else handlePass()
    } else {
      setDragX(0)
    }
    setDragging(false)
    dragStart.current = null
  }

  const handleLike = () => {
    if (currentIndex >= animals.length) return
    setSwipeDirection('right')
    onMatch(animals[currentIndex])
    setTimeout(() => {
      setCurrentIndex(i => i + 1)
      setDragX(0)
      setSwipeDirection(null)
    }, 400)
  }

  const handlePass = () => {
    if (currentIndex >= animals.length) return
    setSwipeDirection('left')
    setTimeout(() => {
      setCurrentIndex(i => i + 1)
      setDragX(0)
      setSwipeDirection(null)
    }, 400)
  }

  const progress = animals.length > 0 ? (currentIndex / animals.length) * 100 : 0
  const current = animals[currentIndex]
  const next = animals[currentIndex + 1]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-2xl font-black text-paw-dark">🐾 PawMatch</h1>
          <span className="text-sm text-gray-400">{currentIndex}/{animals.length} vistos</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B9D, #9B59B6)' }}
          />
        </div>
      </div>

      {/* Filter */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
        {loading ? (
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">🐾</div>
            <p className="text-gray-500">Buscando amigos...</p>
          </div>
        ) : currentIndex >= animals.length ? (
          <div className="text-center px-6">
            <div className="text-6xl mb-4">🎊</div>
            <h3 className="font-display text-2xl font-black text-paw-dark mb-2">¡Ya viste todo!</h3>
            <p className="text-gray-500 mb-6">Revisaste {animals.length} amigos peludos. ¿Cambiamos el filtro?</p>
            <button
              onClick={() => { setFilter('todos'); setCurrentIndex(0) }}
              className="gradient-paw text-white px-6 py-3 rounded-full font-semibold"
            >
              Ver todos de nuevo
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-sm" style={{ height: '500px' }}>
            {/* Next card (behind) */}
            {next && (
              <div className="absolute inset-0 scale-95 opacity-70">
                <AnimalCard animal={next} />
              </div>
            )}
            {/* Current card */}
            <div
              ref={cardRef}
              className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: swipeDirection === 'right'
                  ? 'translateX(150%) rotate(20deg)'
                  : swipeDirection === 'left'
                  ? 'translateX(-150%) rotate(-20deg)'
                  : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
                transition: dragging ? 'none' : 'transform 0.4s ease',
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Like/Nope indicators */}
              {dragX > 50 && (
                <div className="absolute top-8 left-6 z-10 bg-green-500 text-white px-4 py-2 rounded-xl font-black text-xl rotate-[-15deg] border-4 border-green-400">
                  LIKE ❤️
                </div>
              )}
              {dragX < -50 && (
                <div className="absolute top-8 right-6 z-10 bg-red-500 text-white px-4 py-2 rounded-xl font-black text-xl rotate-[15deg] border-4 border-red-400">
                  PASS 👋
                </div>
              )}
              <AnimalCard animal={current} />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!loading && currentIndex < animals.length && (
        <div className="flex items-center justify-center gap-6 pb-6 pt-2">
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform border-2 border-red-100 hover:border-red-300"
          >
            👋
          </button>
          <button
            onClick={handleLike}
            className="w-20 h-20 rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform gradient-paw"
          >
            ❤️
          </button>
          <button
            onClick={() => alert('¡Super Like! 🌟')}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform border-2 border-yellow-100 hover:border-yellow-300"
          >
            ⭐
          </button>
        </div>
      )}
    </div>
  )
}

function getSeedAnimals() {
  return [
    {
      _id: '1', name: 'Mochi', type: 'gatos', breed: 'Persa Mezclado', age: '2 años',
      photos: ['https://images.unsplash.com/photo-1548736824-de3db5aef30f?w=600'],
      story: '¡Hola! Soy Mochi y soy básicamente un príncipe en un cuerpo de gato. Me encanta dormir en el sol, recibir caricias en la barbilla (solo ahí, por favor), y observar el mundo desde el alféizar. Prometo no romper nada... casi nunca.',
      traits: ['Tranquilo', 'Independiente', 'Cariñoso'],
      energy: 2, affection: 4,
      kidsOk: true, petsOk: false,
      shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' }
    },
    {
      _id: '2', name: 'Taco', type: 'perros', breed: 'Chihuahua Mix', age: '1 año',
      photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
      story: '¡SOY TACO Y TENGO MUCHA ENERGÍA! Me encanta correr, jugar, abrazar, lamer, brincar, y repetir todo desde el principio. Si buscas un perro que te cambie la vida con pura alegría, ¡aquí estoy!',
      traits: ['Energético', 'Juguetón', 'Leal'],
      energy: 5, affection: 5,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' }
    },
    {
      _id: '3', name: 'Luna', type: 'perros', breed: 'Labrador Mix', age: '3 años',
      photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600'],
      story: 'Me llamo Luna y llegué al refugio después de que mi familia se mudó al extranjero. Soy una chica educada, sé mis comandos básicos, y me llevo increíble con niños.',
      traits: ['Educada', 'Afectuosa', 'Tranquila'],
      energy: 3, affection: 5,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey' }
    },
    {
      _id: '4', name: 'Sushi', type: 'gatos', breed: 'Siamés Mix', age: '4 años',
      photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600'],
      story: 'Soy Sushi. Soy conversador (MUCHO), curioso, y me encanta supervisar todo lo que haces. ¿Trabajas desde casa? Perfecto, tendré algo que decir sobre cada decisión que tomes.',
      traits: ['Conversador', 'Curioso', 'Inteligente'],
      energy: 3, affection: 3,
      kidsOk: false, petsOk: false,
      shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' }
    },
    {
      _id: '5', name: 'Rufus', type: 'perros', breed: 'Golden Retriever Mix', age: '5 años',
      photos: ['https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600'],
      story: 'Hola, soy Rufus y llevo 2 años esperando mi familia para siempre. Me encanta nadar, rodar en el pasto, y dormir abrazado a mis humanos. Tengo mucho amor por dar.',
      traits: ['Dulce', 'Paciente', 'Sociable'],
      energy: 3, affection: 5,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' }
    },
    {
      _id: '6', name: 'Nala', type: 'gatos', breed: 'Angora Mix', age: '1 año',
      photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600'],
      story: 'Soy Nala y llegué al refugio siendo muy bebé. Soy súper juguetona — tengo una colección de ratoncitos de peluche que defiendo con mi vida.',
      traits: ['Juguetona', 'Social', 'Tierna'],
      energy: 4, affection: 4,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' }
    },
    {
      _id: '7', name: 'Bruno', type: 'perros', breed: 'Beagle Mix', age: '2 años',
      photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600'],
      story: 'Soy Bruno y mis orejas son mis mejores accesorios. Tengo un olfato extraordinario — encuentro galletas escondidas en cualquier parte de la casa.',
      traits: ['Curioso', 'Amigable', 'Activo'],
      energy: 4, affection: 4,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey' }
    },
    {
      _id: '8', name: 'Perla', type: 'gatos', breed: 'Ragdoll Mix', age: '2 años',
      photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600'],
      story: 'Soy Perla y me llaman así porque soy un tesoro. Me encanta que me carguen y ronroneo tan fuerte que a veces me confunden con un motor de carro. Es un don.',
      traits: ['Relajada', 'Cariñosa', 'Dócil'],
      energy: 1, affection: 5,
      kidsOk: true, petsOk: true,
      shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' }
    },
  ]
}
