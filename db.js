const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_1mp3g2dc:gp91808nn9fp7guvh808tjl60s@ds013456.mlab.com:13456/heroku_1mp3g2dc'

const Schema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  totalCount: { type: Number, required: true }
})

mongoose.connect(MONGODB_URI, { promiseLibrary: global.Promise })

const Record = mongoose.model('records', Schema)

module.exports = {Record, mongoose}
