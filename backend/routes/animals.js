const express = require('express')
const router = express.Router()
const Animal = require('../models/Animal')

router.get('/', async (req, res) => {
  try {
    const { type, city, size } = req.query
    const filter = { available: true }
    if (type && type !== 'todos') filter.type = type
    if (city) filter['shelter.city'] = new RegExp(city, 'i')
    if (size) filter.size = size
    const animals = await Animal.find(filter).limit(50)
    res.json(animals)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
    if (!animal) return res.status(404).json({ error: 'Not found' })
    res.json(animal)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
