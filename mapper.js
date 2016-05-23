module.exports = {
  restToMsg: (rests, postcode) => rests.map(rest => ({
    "title": rest.name,
    "subtitle": rest.cuisines,
    "image_url": "https://static.hungryhouse.co.uk/images/restlogos/" + rest.id + ".gif",
    "buttons": [{
      "type": "web_url",
      "url": "https://hungryhouse.co.uk/" + rest.name.toLowerCase().replace(/\s/g , '-') + "?postcode=" + postcode,
      "title": "See menu"
    }]
  }))
}
