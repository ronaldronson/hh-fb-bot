module.exports = {
  restToMsg: (rests, postcode) => rests.map(rest => ({
    "title": rest.name + " in " + rest.town,
    "subtitle": rest.cousines,
    "image_url": "https://static.hungryhouse.co.uk/images/restlogos/" + rest.logo,
    "buttons": [{
      "type": "web_url",
      "url": "https://hungryhouse.co.uk/basel-pizza-london?postcode=" + postcode,
      "title": "See menu"
    }]
  }))
}
