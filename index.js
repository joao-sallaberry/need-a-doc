const express = require('express')
const requireDir = require('require-dir')
const controllers = requireDir('./controllers')
// const pug = require('pug')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'pug')
// app.use(express.static('./public'))

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.render('appointment', { title: 'Hey', message: 'Hello there!' })
})

app.route('/admin/config')
  .get(controllers.admin.config.get)
  .post(controllers.admin.config.post)

const server = app.listen(process.env.PORT = 3000, () => {
  const port = server.address().port
  console.log('Node server listening on port', port)
})

module.exports = server
