const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon'

const Schema = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed })

mongoose.connect(MONGODB_URI, { promiseLibrary: global.Promise })

const Record = mongoose.model('records', Schema)

module.exports = Record
