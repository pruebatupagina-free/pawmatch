const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
  name: String,
  email: String,
  phone: String,
  city: String,
  housing: String,
  hasYard: Boolean,
  hasKids: Boolean,
  kidsAges: String,
  hasPets: Boolean,
  petDetails: String,
  experience: String,
  workHours: String,
  reason: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('AdoptionRequest', adoptionSchema)
