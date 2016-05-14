const hh_token = require('./config').hh_token
const api = require('./api')
const fb = require('./fb')

const storage = {}

module.exports = (sender, text) => {
  storage[sender] || (storage[sender] = {})

  if ('again' == text) {
    storage[sender] = {}
  }

  console.log('[storage]', storage[sender])

  if (!storage[sender].term) {
    if (storage[sender].termReq) {
      storage[sender].term = text
      storage[sender].termReq = false
      storage[sender].postcodeReq = true

      fb.sendTextMessage(sender, 'Give me valid UK postcode')
    } else {
      storage[sender].termReq = true
      fb.sendTextMessage(sender, 'What are you hungry for?')
    }
  } else if (!storage[sender].postcode) {
    if (storage[sender].postcodeReq) {
      storage[sender].postcode = text
      storage[sender].postcodeReq = false

      fb.sendTextMessage(sender, 'Searching for ' + storage[sender].term + ' in ' + storage[sender].postcode)

      api.callHH(storage[sender].postcode, storage[sender].term, (err, data) => {
        if (err) {
          console.log('err ', err)
          fb.sendTextMessage(sender, 'Sorry, try again?')
        } else {
          fb.sendRestaurantsMsg(sender, data, storage[sender].postcode)
        }
      })
    } else {
      fb.sendTextMessage(sender, 'How did you came here?')
    }
  }
}
