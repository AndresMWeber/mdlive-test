  const mongoose = require('mongoose')

  const appsSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true }

  })

  module.exports = mongoose.model('App', appsSchema)