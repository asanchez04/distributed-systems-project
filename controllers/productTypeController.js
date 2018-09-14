'use strict'

import ProductType from '../models/productType'

export default {

  AddProductType: async (req, res) => {

    try {

      const productType = await ProductType.insertMany(req.body)
      res.status(200).send(productType)

    } catch (err) {
      res.status(500).send(err)
    }

  },

  GetProductTypes: async (req,res) => {

    try {

      const productTypes = await ProductType.find({})
        
      res.status(200).send(productTypes)

    } catch (err) {
      res.status(404).send(err)
    }

  }

}

