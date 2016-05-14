const express = require('express')
const fb = require('./fb')
const dialog = require('./dialog')

const app = express()

app.use(require('body-parser').json())

app.set('port', require('./config').port)

app.get('/', (req, res) => {
  res.send('/fbbot')
})

app.get('/fbbot', (req, res) => {
  res.send(fb.verification(req.query));
})

app.post('/fbbot/', (req, res) => {
  fb.getMsg(req.body.entry, dialog)
  res.sendStatus(200)
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
