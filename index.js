const express = require('express')

const api = require('./api')
const fb = require('./fb')
const dialogs = require('./dialogs')

let storage; // mongodb

const chat = require('./chat')(api, fb, dialogs)

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
  fb.getMsg(req.body.entry, (sender, msg) => {
    const save = (record) => storage.updateOne(sender, record)
    storage.find(sender, (err, record) => {
      if (!record) storage.insert({sender: sender})
      chat(sender, msg, record || {}, save)
    })
  })
  res.sendStatus(200)
})

require('./db')((err, db) => {
  if (err) return console.log(err)

  storage = db

  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
  })
})
