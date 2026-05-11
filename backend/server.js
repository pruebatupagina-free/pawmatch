require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

app.use(cors())
app.use(express.json())

// ─── In-memory data ────────────────────────────────────────────────────────
const animals = [
  { _id: '1', name: 'Mochi', type: 'gatos', breed: 'Persa Mezclado', age: '2 años', size: 'pequeño', photos: ['https://images.unsplash.com/photo-1548736824-de3db5aef30f?w=600&q=80'], story: '¡Hola! Soy Mochi y soy básicamente un príncipe en un cuerpo de gato. Me encanta dormir en el sol, recibir caricias en la barbilla (solo ahí, por favor), y observar el mundo desde el alféizar. Prometo no romper nada... casi nunca.', traits: ['Tranquilo', 'Independiente', 'Curioso'], energy: 2, affection: 4, kidsOk: true, petsOk: false, shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' } },
  { _id: '2', name: 'Taco', type: 'perros', breed: 'Chihuahua Mix', age: '1 año', size: 'pequeño', photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80'], story: '¡SOY TACO Y TENGO MUCHA ENERGÍA! Me encanta correr, jugar, abrazar, lamer, brincar, y repetir todo desde el principio. Si buscas un perro que te cambie la vida con pura alegría, ¡aquí estoy!', traits: ['Energético', 'Juguetón', 'Leal'], energy: 5, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' } },
  { _id: '3', name: 'Luna', type: 'perros', breed: 'Labrador Mix', age: '3 años', size: 'grande', photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80'], story: 'Me llamo Luna y llegué al refugio después de que mi familia se mudó al extranjero. Soy una chica educada, sé mis comandos básicos, y me llevo increíble con niños. Solo necesito alguien que me quiera de vuelta.', traits: ['Educada', 'Afectuosa', 'Tranquila'], energy: 3, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey' } },
  { _id: '4', name: 'Sushi', type: 'gatos', breed: 'Siamés Mix', age: '4 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80'], story: 'Soy Sushi. Soy conversador (MUCHO), curioso, y me encanta supervisar todo lo que haces. ¿Trabajas desde casa? Perfecto, tendré algo que decir sobre cada decisión que tomes.', traits: ['Conversador', 'Curioso', 'Inteligente'], energy: 3, affection: 3, kidsOk: false, petsOk: false, shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' } },
  { _id: '5', name: 'Rufus', type: 'perros', breed: 'Golden Retriever Mix', age: '5 años', size: 'grande', photos: ['https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80'], story: 'Hola, soy Rufus y llevo 2 años esperando mi familia para siempre. Me encanta nadar, rodar en el pasto, y dormir abrazado a mis humanos. Tengo mucho amor por dar.', traits: ['Dulce', 'Paciente', 'Sociable'], energy: 3, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' } },
  { _id: '6', name: 'Nala', type: 'gatos', breed: 'Angora Mix', age: '1 año', size: 'pequeño', photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'], story: 'Soy Nala y crecí entre humanos así que me encanta la gente. Soy súper juguetona — tengo una colección de ratoncitos de peluche que defiendo con mi vida. Si tienes un puntero láser, ya somos mejores amigos.', traits: ['Juguetona', 'Social', 'Tierna'], energy: 4, affection: 4, kidsOk: true, petsOk: true, shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' } },
  { _id: '7', name: 'Bruno', type: 'perros', breed: 'Beagle Mix', age: '2 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80'], story: 'Soy Bruno y mis orejas son mis mejores accesorios. Tengo un olfato extraordinario — encuentro galletas en cualquier parte de la casa. Necesito salidas diarias y muchos snacks. No es negociable.', traits: ['Curioso', 'Amigable', 'Activo'], energy: 4, affection: 4, kidsOk: true, petsOk: true, shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey' } },
  { _id: '8', name: 'Mía', type: 'gatos', breed: 'Doméstico Corto', age: '6 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80'], story: 'Me llamo Mía y tengo 6 años de ser perfecta. Soy la definición del gato elegante. Me tomará un par de semanas confiar en ti, pero cuando lo haga, tendrás una amiga de por vida.', traits: ['Serena', 'Elegante', 'Leal'], energy: 1, affection: 3, kidsOk: false, petsOk: true, shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' } },
  { _id: '9', name: 'Max', type: 'perros', breed: 'Pastor Alemán Mix', age: '4 años', size: 'grande', photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80'], story: 'Soy Max y aunque me veo intimidante, soy un bebé enorme. Soy protector de mi familia, pero también me derrumbo cuando alguien me rasca detrás de las orejas. No se lo digas a nadie.', traits: ['Protector', 'Inteligente', 'Leal'], energy: 4, affection: 4, kidsOk: true, petsOk: false, shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' } },
  { _id: '10', name: 'Canela', type: 'perros', breed: 'Dachshund Mix', age: '3 años', size: 'pequeño', photos: ['https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=600&q=80'], story: 'Soy Canela y tengo el cuerpo de un perro pero el alma de un oso de peluche gigante. Mis patas cortas no me impiden correr más rápido de lo que esperas.', traits: ['Cariñosa', 'Traviesa', 'Valiente'], energy: 3, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' } },
  { _id: '11', name: 'Simba', type: 'gatos', breed: 'Mainecoon Mix', age: '3 años', size: 'grande', photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80'], story: 'Mi nombre es Simba y soy grande, esponjoso y majestuoso. A veces olvido que no soy un león. También soy muy cariñoso cuando no estoy siendo rey.', traits: ['Majestuoso', 'Inteligente', 'Afectuoso'], energy: 2, affection: 4, kidsOk: true, petsOk: true, shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' } },
  { _id: '12', name: 'Coco', type: 'perros', breed: 'Poodle Mix', age: '2 años', size: 'pequeño', photos: ['https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=600&q=80'], story: 'Hola! Soy Coco y tengo el pelo más rizaco del refugio. Mi talento especial es detectar cuando alguien está triste y aparecer mágicamente para curarlos con mis ojos de cachorrito.', traits: ['Inteligente', 'Empático', 'Alegre'], energy: 4, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey' } },
  { _id: '13', name: 'Manchas', type: 'gatos', breed: 'Doméstico Tricolor', age: '5 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80'], story: 'Soy Manchas y fui gata callejera durante 3 años. Ahora busco un hogar donde pueda finalmente bajar la guardia. Cuando te gano la confianza, soy la mejor compañía del mundo.', traits: ['Independiente', 'Valiente', 'Especial'], energy: 2, affection: 3, kidsOk: false, petsOk: true, shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey' } },
  { _id: '14', name: 'Rocky', type: 'perros', breed: 'Bulldog Mix', age: '4 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80'], story: 'Me llamo Rocky y aunque tengo cara de malo, soy el más tierno del refugio. Ronco, sí. ¿Y qué? Pero te garantizo que ningún perro va a quererte más que yo.', traits: ['Tierno', 'Gracioso', 'Leal'], energy: 2, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey' } },
  { _id: '15', name: 'Perla', type: 'gatos', breed: 'Ragdoll Mix', age: '2 años', size: 'mediano', photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'], story: 'Soy Perla y me llaman así porque soy un tesoro. Me encanta que me carguen — me quedo completamente relajada en tus brazos. Ronroneo tan fuerte que a veces me confunden con un motor de carro.', traits: ['Relajada', 'Cariñosa', 'Dócil'], energy: 1, affection: 5, kidsOk: true, petsOk: true, shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey' } },
]

const adoptionRequests = []

// ─── Routes ────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'PawMatch', animals: animals.length }))

app.get('/api/animals', (req, res) => {
  const { type, size, city } = req.query
  let result = [...animals]
  if (type && type !== 'todos') result = result.filter(a => a.type === type)
  if (size) result = result.filter(a => a.size === size)
  if (city) result = result.filter(a => a.shelter.city.toLowerCase().includes(city.toLowerCase()))
  res.json(result)
})

app.get('/api/animals/:id', (req, res) => {
  const animal = animals.find(a => a._id === req.params.id)
  if (!animal) return res.status(404).json({ error: 'Not found' })
  res.json(animal)
})

app.post('/api/adoption', (req, res) => {
  const request = { id: Date.now().toString(), ...req.body, createdAt: new Date(), status: 'pending' }
  adoptionRequests.push(request)
  console.log(`New adoption request for animal ${req.body.animalId} from ${req.body.name}`)
  res.json({ success: true, id: request.id })
})

app.get('/api/adoption', (req, res) => {
  res.json(adoptionRequests)
})

// ─── Socket.io chat ────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
})

// ─── Start ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`PawMatch API running on port ${PORT} — ${animals.length} animals loaded`))
