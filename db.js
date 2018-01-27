const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon'

const Schema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  totalCount: { type: Number, required: true }
})

mongoose.connect(MONGODB_URI, { promiseLibrary: global.Promise })

const Record = mongoose.model('records', Schema)

module.exports = {Record, mongoose}
