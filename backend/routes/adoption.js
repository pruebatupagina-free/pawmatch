const express = require('express')
const router = express.Router()
const AdoptionRequest = require('../models/AdoptionRequest')

router.post('/', async (req, res) => {
  try {
    const request = new AdoptionRequest(req.body)
    await request.save()
    res.json({ success: true, id: request._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().populate('animalId').sort('-createdAt')
    res.json(requests)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
