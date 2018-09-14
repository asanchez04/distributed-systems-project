'use strict'

import Client from '../models/clients'

export default {

  AddClient: async (req, res) => {

    try {

      const client = await Client.insertMany(req.body)
      res.status(200).send(client)

    } catch (err) {
      res.status(404).send(err)
    }

  },

  UpdateClient: async (req, res) => {

    try {

      const { identification } = req.params

      const client = await Client.
        findOneAndUpdate({ identification }, req.body, { new: true })
        
      res.status(200).send({ client })

    } catch (err) {
      res.status(404).send(err)
    }

  },

  GetClients: async (req,res) => {

    try {

      const clients = await Client.find({})
        
      res.status(200).send(clients)

    } catch (err) {
      res.status(404).send(err)
    }

  }

}

