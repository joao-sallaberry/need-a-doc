const requireDir = require('require-dir')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const controllers = requireDir('./controllers')

const mongoose = require('mongoose')
const config = require('./config/config')
mongoose.connect(config.mongo.url, { useNewUrlParser: true })

app.set('view engine', 'pug')
// app.use(express.static('./public'))

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/appointment')
})

app.route('/appointment')
  .get(controllers.appointment.init.get)
  .post(controllers.appointment.init.post)

app.route('/appointment/time')
  .post(controllers.appointment.time.post)

app.get('/admin', (req, res) => {
  res.redirect('/admin/timetable')
})

app.route('/admin/timetable')
  .get(controllers.admin.timetable.get)

app.route('/admin/config')
  .get(controllers.admin.config.get)
  .post(controllers.admin.config.post)

const server = app.listen(process.env.PORT = 3000, () => {
  const port = server.address().port
  console.log('Node server listening on port', port)
})

module.exports = server
