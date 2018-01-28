/* eslint-disable */

const {Record, mongoose} = require('../db')

jest.setTimeout(10000)

test('Yearly query result lenght must bigger than 0', async () => {
  expect.assertions(1)
  try {
    let data = await Record.aggregate([
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
    expect(data.lenght).not.toBe(0)
    mongoose.connection.close()
  } catch (e) {
    console.log(e)
  }
})
