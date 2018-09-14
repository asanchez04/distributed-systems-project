'use strict'

import mongoose from '../config/config'

const { Schema } = mongoose

const ProductSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  productType: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  state: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

export default mongoose.model('Product', ProductSchema) 
