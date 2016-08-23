const MongoClient = require('mongodb').MongoClient
const connStr = require('./config').mongo_db

module.exports = (onready) => {
  MongoClient.connect(connStr, (err, db) => {
    if (err) return onready(err)

    const settings = db.collection('settings')
    const collection = db.collection('users')

    onready(null, {
      close: () => db.close(),
      updateOne: (key, data, done) => collection.updateOne({sender: key}, {$set: data}, done),
      insert: (data, done) => collection.insertOne(data, done),
      find: (key, done) => collection.findOne({sender: key}, done),
      getMode: (done) => settings.findOne({id: 'mode'}, done),
    })
  });
}
