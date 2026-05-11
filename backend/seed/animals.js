const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

const Animal = require('../models/Animal')

const animals = [
  {
    name: 'Mochi', type: 'gatos', breed: 'Persa Mezclado', age: '2 años', size: 'pequeño',
    photos: ['https://images.unsplash.com/photo-1548736824-de3db5aef30f?w=600&q=80'],
    story: '¡Hola! Soy Mochi y soy básicamente un príncipe en un cuerpo de gato. Me encanta dormir en el sol, recibir caricias en la barbilla (solo ahí, por favor), y observar el mundo desde el alféizar. Prometo no romper nada... casi nunca.',
    traits: ['Tranquilo', 'Independiente', 'Curioso'],
    energy: 2, affection: 4, kidsOk: true, petsOk: false,
    shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey', address: 'Col. Mitras Norte' }
  },
  {
    name: 'Taco', type: 'perros', breed: 'Chihuahua Mix', age: '1 año', size: 'pequeño',
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80'],
    story: '¡SOY TACO Y TENGO MUCHA ENERGÍA! Me encanta correr, jugar, abrazar, lamer, brincar, y repetir todo desde el principio. Si buscas un perro que te cambie la vida con pura alegría, ¡aquí estoy! Bonus: soy tan pequeño que cabe en tu bolsa (pero no lo hagas, tengo dignidad).',
    traits: ['Energético', 'Juguetón', 'Leal'],
    energy: 5, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey', address: 'Col. Roma' }
  },
  {
    name: 'Luna', type: 'perros', breed: 'Labrador Mix', age: '3 años', size: 'grande',
    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80'],
    story: 'Me llamo Luna y llegué al refugio después de que mi familia se mudó al extranjero. Soy una chica educada, sé mis comandos básicos, no muerdo los muebles (ya lo superé), y me llevo increíble con niños. Solo necesito alguien que me quiera de vuelta.',
    traits: ['Educada', 'Afectuosa', 'Tranquila'],
    energy: 3, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey', address: 'Col. Cumbres' }
  },
  {
    name: 'Sushi', type: 'gatos', breed: 'Siamés Mix', age: '4 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80'],
    story: 'Soy Sushi. Sí, ya sé que es un nombre gracioso para un gato, pero aquí estoy, siendo absolutamente fabuloso. Soy conversador (MUCHO), curioso, y me encanta supervisar todo lo que haces. ¿Trabajas desde casa? Perfecto, tendré algo que decir sobre cada decisión que tomes.',
    traits: ['Conversador', 'Curioso', 'Inteligente'],
    energy: 3, affection: 3, kidsOk: false, petsOk: false,
    shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey', address: 'Col. Mitras Norte' }
  },
  {
    name: 'Rufus', type: 'perros', breed: 'Golden Retriever Mix', age: '5 años', size: 'grande',
    photos: ['https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80'],
    story: 'Hola, soy Rufus y llevo 2 años esperando mi familia para siempre. Soy el tipo de perro que hace que todos en el parque se detengan y digan "¡qué hermoso!". Me encanta nadar, rodar en el pasto, y dormir abrazado a mis humanos. Tengo mucho amor por dar.',
    traits: ['Dulce', 'Paciente', 'Sociable'],
    energy: 3, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey', address: 'Col. Roma' }
  },
  {
    name: 'Nala', type: 'gatos', breed: 'Angora Mix', age: '1 año', size: 'pequeño',
    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'],
    story: 'Soy Nala y llegué al refugio siendo muy bebé. Crecí entre humanos así que me encanta la gente. Soy súper juguetona — tengo una colección de ratoncitos de peluche que defiendo con mi vida. Si tienes un puntero láser, ya somos mejores amigos.',
    traits: ['Juguetona', 'Social', 'Tierna'],
    energy: 4, affection: 4, kidsOk: true, petsOk: true,
    shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey', address: 'Col. del Valle' }
  },
  {
    name: 'Bruno', type: 'perros', breed: 'Beagle Mix', age: '2 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80'],
    story: 'Soy Bruno y mis orejas son mis mejores accesorios. Tengo un olfato extraordinario — encuentro galletas escondidas en cualquier parte de la casa. Me encanta explorar, olfatear todo, y hacer amigos en el parque. Necesito salidas diarias y muchos snacks. No es negociable.',
    traits: ['Curioso', 'Amigable', 'Activo'],
    energy: 4, affection: 4, kidsOk: true, petsOk: true,
    shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey', address: 'Col. Cumbres' }
  },
  {
    name: 'Mía', type: 'gatos', breed: 'Doméstico Corto', age: '6 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80'],
    story: 'Me llamo Mía y tengo 6 años de ser perfecta. Soy la definición del gato elegante: no persigo nada sin razón, no maúllo de más, y siempre encuentro el mejor lugar del sofá. Me tomará un par de semanas confiar en ti, pero cuando lo haga, tendrás una amiga de por vida.',
    traits: ['Serena', 'Elegante', 'Leal'],
    energy: 1, affection: 3, kidsOk: false, petsOk: true,
    shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey', address: 'Col. del Valle' }
  },
  {
    name: 'Max', type: 'perros', breed: 'Pastor Alemán Mix', age: '4 años', size: 'grande',
    photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80'],
    story: 'Soy Max y aunque me veo intimidante, soy un bebé enorme. Me rescataron de la calle hace un año y desde entonces he aprendido que los humanos son increíbles. Soy protector de mi familia, pero también me derrumbo cuando alguien me rasca detrás de las orejas. No se lo digas a nadie.',
    traits: ['Protector', 'Inteligente', 'Leal'],
    energy: 4, affection: 4, kidsOk: true, petsOk: false,
    shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey', address: 'Col. Mitras Norte' }
  },
  {
    name: 'Canela', type: 'perros', breed: 'Dachshund Mix', age: '3 años', size: 'pequeño',
    photos: ['https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=600&q=80'],
    story: 'Soy Canela y tengo el cuerpo de un perro pero el alma de un oso de peluche gigante. Mis patas cortas no me impiden correr más rápido de lo que esperas. Me encanta excavar en el jardín (o en el sofá, si me dejas), y soy absolutamente adicta a los mimos matutinos.',
    traits: ['Cariñosa', 'Traviesa', 'Valiente'],
    energy: 3, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey', address: 'Col. Roma' }
  },
  {
    name: 'Simba', type: 'gatos', breed: 'Mainecoon Mix', age: '3 años', size: 'grande',
    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80'],
    story: 'Mi nombre es Simba y soy grande, esponjoso y majestuoso. A veces olvido que no soy un león. Me encanta sentarme en la ventana y observar el mundo como si todo me perteneciera. Y técnicamente, me pertenece. También soy muy cariñoso cuando no estoy siendo rey.',
    traits: ['Majestuoso', 'Inteligente', 'Afectuoso'],
    energy: 2, affection: 4, kidsOk: true, petsOk: true,
    shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey', address: 'Col. del Valle' }
  },
  {
    name: 'Coco', type: 'perros', breed: 'Poodle Mix', age: '2 años', size: 'pequeño',
    photos: ['https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=600&q=80'],
    story: 'Hola! Soy Coco y tengo el pelo más rizaco del refugio. Soy hiper inteligente (ya sé 8 comandos) y me encanta aprender trucos nuevos. Mi talento especial es detectar cuando alguien está triste y aparecer mágicamente para curarlos con mis ojos de cachorrito.',
    traits: ['Inteligente', 'Empático', 'Alegre'],
    energy: 4, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Refugio Amor Animal', phone: '8187654321', city: 'Monterrey', address: 'Col. Cumbres' }
  },
  {
    name: 'Manchas', type: 'gatos', breed: 'Doméstico Tricolor', age: '5 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80'],
    story: 'Soy Manchas y cada mancha en mi pelaje tiene una historia. Fui gata callejera durante 3 años, así que sé lo que es valerse por una misma. Ahora busco un hogar donde pueda finalmente bajar la guardia. Cuando te gano la confianza, soy la mejor compañía del mundo.',
    traits: ['Independiente', 'Valiente', 'Especial'],
    energy: 2, affection: 3, kidsOk: false, petsOk: true,
    shelter: { name: 'Refugio Patitas Felices', phone: '8112345678', city: 'Monterrey', address: 'Col. Mitras Norte' }
  },
  {
    name: 'Rocky', type: 'perros', breed: 'Bulldog Mix', age: '4 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80'],
    story: 'Me llamo Rocky y aunque tengo cara de malo, soy el más tierno del refugio. Ronco, sí. ¿Y qué? A veces babeo un poco, también normal. Pero te garantizo que ningún perro va a quererte más que yo. Tengo un récord mundial de hacer feliz a la gente.',
    traits: ['Tierno', 'Gracioso', 'Leal'],
    energy: 2, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Hogar Animal MTY', phone: '8198765432', city: 'Monterrey', address: 'Col. Roma' }
  },
  {
    name: 'Perla', type: 'gatos', breed: 'Ragdoll Mix', age: '2 años', size: 'mediano',
    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'],
    story: 'Soy Perla y me llaman así porque soy un tesoro — lo dice mi voluntaria favorita. Me encanta que me carguen (soy una gata ragdoll, me quedo completamente relajada en tus brazos). Ronroneo tan fuerte que a veces me confunden con un motor de carro. Es un don.',
    traits: ['Relajada', 'Cariñosa', 'Dócil'],
    energy: 1, affection: 5, kidsOk: true, petsOk: true,
    shelter: { name: 'Gatitos MTY', phone: '8134567890', city: 'Monterrey', address: 'Col. del Valle' }
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawmatch'
  await mongoose.connect(uri)
  await Animal.deleteMany({})
  await Animal.insertMany(animals)
  console.log(`✅ Seeded ${animals.length} animals`)
  await mongoose.disconnect()
}

seed().catch(console.error)
