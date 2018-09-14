'use strict'

import Product from '../models/products'
import ProductType from '../models/productType'

import Invoice from '../models/invoice'
import Client from '../models/clients'

export default {

  AddProduct: async (req, res) => {

    try {

      let data = {
        status: 404,
        product: { message: 'Product Type not found' }
      }

      const { productType } = req.body

      const findProductType = await ProductType.findOne({ value: productType })

      if (findProductType != null) {
        data.product = await Product.insertMany(req.body)
        data.status = 200
      }

      res.status(data.status).send(data)

    } catch (err) {
      res.status(500).send(err)
    }


  },

  DisableProductById: async (req, res) => {

    try {

      const { id } = req.params

      const response = await Product
        .findByIdAndUpdate(id, { state: false }, { new: true })

      return res.status(200).send(response)

    } catch (err) {
      return res.status(500).send(err)
    }

  },

  GetProductByInvoiceId: async (req, res) => {

    try {

      let total = 0

      const { invoiceId } = req.params

      const invoice = await Invoice
        .findById(invoiceId)
        .populate({ path: 'invoiceDetail.productId', select: 'description price' })

      const infoClient = await Client
        .findOne({ identification: invoice.client })
        .select(['-createdAt', '-_id'])

      invoice.invoiceDetail.forEach(idetail => {
        let subtotal = idetail.productId.price * idetail.units
        idetail.set('subtotal', subtotal, { strict: false })
        total += subtotal
      })

      invoice.set('total', total, { strict: false })

      return res.status(200).send({
        infoClient,
        invoice
      })

    } catch (err) {
      return res.status(404).send({ error: err.toString() })
    }

  },

  GetProducts: async (req,res) => {

    try {

      const products = await Product.find({})
        
      res.status(200).send(products)

    } catch (err) {
      res.status(404).send(err)
    }

  }

}

