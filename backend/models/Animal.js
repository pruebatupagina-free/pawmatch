const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['perros', 'gatos'], required: true },
  breed: String,
  age: String,
  photos: [String],
  story: String,
  traits: [String],
  energy: { type: Number, min: 1, max: 5 },
  affection: { type: Number, min: 1, max: 5 },
  size: { type: String, enum: ['pequeño', 'mediano', 'grande'] },
  kidsOk: Boolean,
  petsOk: Boolean,
  shelter: {
    name: String,
    phone: String,
    city: String,
    address: String,
  },
  available: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Animal', animalSchema)
