/* eslint-disable */

const { Record } = require('../db')

const caseOne = async () => {
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)
  const endDate = new Date()

  let response
  try {
    response = await Record.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      },
      totalCount: {
        $gte: 2000,
        $lte: 3000
      }
    }, {})
  } catch (e) {
    response = {error: e}
  }
  return response
}

test('Yearly query result lenght must bigger than 0', async () => {
  expect.assertions(1)
  try {
    let data = await caseOne()
    expect(data.lenght).not.toBe(0)
  } catch (e) {
    console.log(e)
  }
})
