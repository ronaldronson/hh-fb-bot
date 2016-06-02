module.exports = {
  restToMsg: (rests, postcode) => rests.map(rest => ({
    "title": rest.name,
    "subtitle": rest.cuisines.replace(/&amp;/g, '&'),
    "image_url": "https://static.hungryhouse.co.uk/images/restlogos/" + rest.id + ".gif",
    "buttons": [{
      "type": "web_url",
      "url": "https://hungryhouse.co.uk/" + rest.webname + "?postcode=" + postcode,
      "title": "See menu"
    }]
  }))
}
