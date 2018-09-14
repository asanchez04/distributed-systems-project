'use strict'

import mongoose from '../config/config'

const { Schema } = mongoose

const ProductTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value:{
    type: Number,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

export default mongoose.model('ProductType', ProductTypeSchema) 
