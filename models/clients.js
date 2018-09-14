'use strict'

import mongoose from '../config/config'

const { Schema } = mongoose

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  identification: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

export default mongoose.model('Client', ClientSchema) 
