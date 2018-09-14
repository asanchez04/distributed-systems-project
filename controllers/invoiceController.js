'use strict'

import Invoice from '../models/invoice'
import Client from '../models/clients'
import Product from '../models/products'

import utils from '../utils/utils'

const CheckState = (array) => {

  let flag = false

  array.forEach(item => {
    if (!item.state) {
      flag = true
    }
  })

  return flag

}

export default {

  CreateInvoice: async (req, res) => {

    try {

      let productsId = []
      let invoice = {}
      const { invoiceDetail, client } = req.body

      const find_client = await Client
        .findOne({ identification: client })

      if (find_client == null)
        return res.status(200).send({ message: 'Client not found' })

      if (!utils.find_duplicate_in_array(invoiceDetail)) {

        invoiceDetail.forEach(item => {
          productsId.push(item.productId)
        })

        const products = await Product
          .find({ _id: { $in: productsId } })

        if (!CheckState(products)) {
          invoice = await Invoice.insertMany(req.body)
          return res.status(200).send(invoice)
        }
      }

      return res.status(404).send({
        err: 'invoiceDetail - Duplicated Products or Disabled'
      })

    } catch (err) {
      res.status(500).send({
        error: err.toString()
      })
    }

  },

  GetInvoiceByClient: async (req, res) => {

    try {

      let total = 0
      const { identification } = req.params

      const client = await Client
        .findOne({ identification })
        .select(['-createdAt', '-_id'])

      const invoice_list = await Invoice
        .find({ client: identification })
        .select(['-client', '-createdAt', '-invoiceDetail'])

      return res.status(200).send({
        client: client,
        invoicesTotal: invoice_list.length,
        invoices: invoice_list.reverse()
      })

    } catch (err) {
      return res.status(404).send({
        error: err.toString()
      })
    }

  }

}

