const express = require('express')
// const pug = require('pug')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'pug')
// app.use(express.static('./public'))

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.render('appointment', { title: 'Hey', message: 'Hello there!' })
})

app.get('/admin/config', (req, res) => {
  res.render('admin/config', {
    weekdays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
  })
})
app.post('/admin/config', (req, res) => {
  console.log(req.body)
})

app.post('/changeTimes', (req, res) => {
  console.log('time changed!')
})

const server = app.listen(process.env.PORT = 3000, function () {
  const port = server.address().port
  console.log('Node server listening on port', port)
})

module.exports = server
