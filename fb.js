const request = require('request')
const config = require('./config')
const restToMsg = require('./mapper').restToMsg

function welcome(text) {
  request({
    url: 'https://graph.facebook.com/v2.6/' + config.app_id + '/thread_settings?access_token=' + config.access_token,
    method: 'POST',
    json: {
      "setting_type":"call_to_actions",
      "thread_state":"new_thread",
      "call_to_actions":[{
        "message": {
          "text": text || "Welcome to hungryhouse!"
        }
      }
    ]}
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

function send(sender, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: config.access_token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: message,
    }
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

function sendTextMessage(sender, text) {
  send(sender, {text: text})
}

function sendRestaurantsMsg(sender, rests, postcode) {
  send(sender, {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": restToMsg(rests, postcode)
      }
    }
  })
}

function getMsg(entry, done) {
  var messaging_events = entry[0].messaging

  console.log('[fbbot]', JSON.stringify(entry))

  for (var i = 0; i < messaging_events.length; i++) {
    var event = messaging_events[i]
    var sender = event.sender.id

    if (event.message && event.message.text) {
      done(sender, event.message.text)
    }
  }
}

function verification(params) {
  if (params['hub.verify_token'] === config.verify_token) {
    return params['hub.challenge'];
  }
  return 'Error, wrong validation token';
}

module.exports = {
  verification: verification,
  getMsg: getMsg,
  sendRestaurantsMsg: sendRestaurantsMsg,
  sendTextMessage: sendTextMessage
}
