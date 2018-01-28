const Record = require('./db')

const start = async () => {
  try {
    let out = await Record.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date('2016-01-26'),
            $lt: new Date('2017-04-26')
          }
        }
      },
      {
        $project: {
          key: 1,
          _id: 0,
          createdAt: 1,
          totalCount: {
            $sum: '$counts'
          }
        }
      }, {
        $match: {
          totalCount: {
            $gt: 2700,
            $lt: 3000
          }
        }
      }
    ])
    console.log(out)
  } catch (e) {
    console.log(e)
  }
}

start()
