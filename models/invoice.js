'use strict'

import mongoose from '../config/config'
import idValidator from 'mongoose-id-validator'

const { Schema } = mongoose

const InvoiceSchema = new Schema({  
  client: {
    type: String,
    required: true
  },
  invoiceDetail: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    units: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

InvoiceSchema.plugin(idValidator)

export default mongoose.model('Invoice', InvoiceSchema) 
