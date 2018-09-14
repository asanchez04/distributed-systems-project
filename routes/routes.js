'use strict'

import express from 'express'

const router = express.Router()

import clientController from '../controllers/clientController'
import invoiceController from '../controllers/invoiceController'
import productController from '../controllers/productController'
import productTypeController from '../controllers/productTypeController'

router.post('/api/client', clientController.AddClient)
router.get('/api/client', clientController.GetClients)
router.put('/api/client/:identification', clientController.UpdateClient)

router.post('/api/product', productController.AddProduct)
router.get('/api/product', productController.GetProducts)
router.delete('/api/product/:id', productController.DisableProductById)
router.post('/api/product/type', productTypeController.AddProductType)
router.get('/api/product/type', productTypeController.GetProductTypes)

router.post('/api/invoice', invoiceController.CreateInvoice)
router.get('/api/invoice/identification/:identification', invoiceController.GetInvoiceByClient)
router.get('/api/invoice/product/:invoiceId', productController.GetProductByInvoiceId)

router.get('/', (req,res) => {
  res.status(200).send(
  `
    <h1 style="color: purple; font-family: Arial">API Running</h1>
  `)
})

module.exports = router