const postcode = require('./validation').postcode
const cousines = require('./cousines')

const words = ['i', 'want', 'some', 'please', 'for', 'me', 'thanks', 'you', 'would', 'like', 'have', 'or', 'with', 'without', 'only', 'all', 'big', 'small', 'large']

const isIn = (msg, parts) => parts
  .map(part => !!~msg.indexOf(part))
  .some(res => res)

const matchCuisine = str => cousines
  .map(cousine => isIn(str, cousine.split(' ')) && cousine)
  .filter(a => a)
  .shift()

const getTerm = str => normilize(str)
  .split(' ')
  .filter(a => !~words.indexOf(a))
  .shift()

const normilize = str => String(str)
  .toLocaleLowerCase()
  .replace(/[!@#$%\^\&\*\(<>,.\{\}[\]]/g , '')
  .split(' ').filter(str => str).join(' ')

const getPostcode = str => str
  .split(' ')
  .map(postcode)
  .filter(v => v)
  .map(v => v.shift())
  .shift()

const getSearchUrl = (postcode, term) =>
  'https://hungryhouse.co.uk/takeaways/' +
  postcode + '/Pizza?q=' + term

module.exports = (api, fb, dialogs) => (sender, msg, storage, save) => {
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

  if (_('are you')) {  // easter egg
    _send('are_you')
    return
  }

  if (_('again')) {  // ask cousine again
    _send('again')
    return
  }

  if (!storage.postcode) {  // no postcode
    _ask(_('hi', 'hello', 'hey'))
    return
  }

  if (getPostcode(msg)) {  // do search with any entry
    _send('search_postcode', storage.postcode)    // postcode received now
  } else {
    _send('search_cousine')     // we had postcode before
  }

  const cousine = matchCuisine(msg) || getTerm(msg)

  try {
    api.callHH(storage.postcode, cousine, (err, data) => {
      if (!err && data) {
        fb.sendRestaurantsMsg(sender, data, storage.postcode)
      } else {
        throw new Error(err)
      }
    })
  } catch (e) {
    _send('search', getSearchUrl(storage.postcode, cousine))
  }
}
