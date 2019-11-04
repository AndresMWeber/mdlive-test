  const mongoose = require('mongoose')

  const appsSchema = new mongoose.Schema({
      id: { type: Number, required: true, unique: true },
      name: { type: String, required: true, unique: true }
  })

  module.exports = mongoose.model('App', appsSchema)