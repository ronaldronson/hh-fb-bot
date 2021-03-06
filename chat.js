const postcode = require('./validation').postcode
const cousines = require('./cousines')
const secret = require('./config').secret

const words = ['i', "i'm", 'am', 'want', 'some', 'please', 'for', 'me', 'thanks', 'you', 'would', 'like', 'have', 'or', 'with', 'without', 'only', 'all', 'big', 'small', 'large', 'there', 'bot']

const isIn = (msg, parts) => parts
  .map(part => msg === part)
  .some(res => res)

const matchCuisine = str => cousines
  .map(cousine => isIn(normilize(str), cousine.split(' ')) && cousine)
  .filter(a => a)
  .shift()

const getTerm = str => normilize(str)
  .split(' ')
  .filter(a => !~words.indexOf(a))
  .shift()

const normilize = str => String(str)
  .toLowerCase()
  .replace(/[!@#$%\^\&\*\(<>,.\{\}[\]]/g , '')
  .split(' ').filter(str => str).join(' ')

const getPostcode = str => postcode(str) && postcode(str)[0].replace(' ', '')

const getSearchUrl = (postcode, term) =>
  'https://hungryhouse.co.uk/takeaways/' +
  postcode + '/?q=' + term


module.exports = (api, fb, dialogs) => (sender, msg, storage, save, mode) => {
  const _ = (...arr) => isIn(normilize(msg), arr)

  const _send = (section, params) =>
    fb.sendTextMessage(sender, dialogs.getFromSection(section, params))

  const _ask = ft => {
    storage.req = storage.postcode ? 'cousine' : 'postcode'
    _send(
      (ft ? 'hi' : 'ask') + '_' +
      (storage.postcode ? 'cousine' : 'postcode')
    )
    save(storage)
  }

  const doCall = (postcode, cousine) =>
    api.callHH(postcode, cousine, (err, data) => {
      if (!err && data && data.length) {
        fb.sendRestaurantsMsg(sender, data, storage.postcode)
        setTimeout(() => _send('again'), 5000)
      } else {
        _send('err', getSearchUrl(storage.postcode, cousine))
      }
    })

  if ('production' !== mode && !storage.trusted) {
    if (msg === secret) {
      storage.trusted = true
      _send('verify_test')
      save(storage)
    }

    return;
  }

  if (storage.req === 'postcode') {  // check if current entry is postcode
    const poscodeVal = getPostcode(msg)    // check if input is valid postcode

    if (poscodeVal) {
      storage.req = false
      storage.postcode = poscodeVal
      save(storage)

      if (!storage.cousine) {      // do search ?
        _ask(false)
        return
      }
      // no fallback -- do search
    } else {      // postcode not valid
      _send('postcode_error')
      return
    }
  }

  if (_('help')) {
    return _send('help')
  }

  if (_('are you')) {  // easter egg
    _send('are_you')
    return
  }

  if (_('again')) {  // ask cousine again
    _send('again')
    return
  }

  if (!storage.postcode) {  // no postcode
    _ask(true)
    return
  }

  if (_('hi', 'hello', 'hey') && !matchCuisine(msg)) {
      _ask(true)
      return
  }

  if (_('yes', 'no')) {
      _ask(_('hi', 'hello', 'hey'))
      return
  }

  if (_('hungry', 'starving', 'feed', 'tasty', 'surprise')) { // hungry/staving case
    const cousine = matchCuisine(msg)
    const randomCousine = dialogs.getRandomCousine()

    cousine ? _send('search_cousine') : _send('maybe', randomCousine)
    doCall(storage.postcode, cousine || randomCousine)
    return
  }

  if (getPostcode(msg)) {  // do search with any entry
    _send('search_postcode', storage.postcode)    // postcode received now
  } else {
    _send('search_cousine')     // we had postcode before
  }

  doCall(storage.postcode, matchCuisine(msg) || msg)
}
