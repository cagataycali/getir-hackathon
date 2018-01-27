const { Record, mongoose } = require('./db')
const Hashids = require('hashids')
const hashids = new Hashids('getir-cagatay', 10)
const encode = i => hashids.encode(i)

console.log('This process run when postinstall, generate mock data in mLab.\nThanks for your patience.')

let day = new Date()

let currentYear = day.getFullYear()

day.setFullYear(currentYear - 2) // Previous two year.
day.setMonth(0)
day.setDate(0)

const generateMockData = async day => {
  if (day.getFullYear() !== currentYear) {
    day.setDate(day.getDate() + 1)
    let record = new Record({
      totalCount: Math.floor(Math.random() * 5000) + 0,
      createdAt: day,
      key: encode(day.valueOf())
    })
    try {
      await record.save()
      generateMockData(day)
    } catch (e) {
      console.log(day)
      mongoose.connection.close()
    }
  } else {
    console.log('Generating done!')
    mongoose.connection.close()
  }
}

process.env.NODE_ENV === 'production' ? generateMockData(day) : mongoose.connection.close()
