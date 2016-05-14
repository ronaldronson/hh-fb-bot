const hh_token = require('./config').hh_token
const hh = require('hh_api')

module.exports = {
  callHH: (postcode, term, done) =>
    hh({token: hh_token}).getRestaurants({
      postcode: postcode, term: term
    }, done)
}
