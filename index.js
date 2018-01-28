const app = require('express')()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const {Record} = require('./db')
const query = require('./lib/query')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('*', (_, res) => res.status(405).json({'code': 'MethodNotAllowedError', 'message': 'GET is not allowed'})) // 405 Method Not Allowed

app.post('/searchRecord', async (req, res) => {
  let response
  try {
    const records = await Record.aggregate(query(req.body))
    response = {code: 0, msg: 'Success', records}
    res.status(200)
  } catch (e) {
    console.log(e)
    response = {code: -1, msg: 'Missing params (startDate, endDate, minCount, maxCount)'}
    res.status(422) // https://tools.ietf.org/html/rfc4918#page-78
  } finally {
    res.json(response)
  }
})

app.listen(PORT, () => console.log(`Backend working properly at ${PORT}`))
