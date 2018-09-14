'use strict'

import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

mongoose.connect(
  'mongodb://admin:admin123456@ds115758.mlab.com:15758/mongod')
  .catch(err => console.log(err))

export default mongoose