'use strict'

module.exports.postcode = value => value
  .replace(/[^a-zA-Z0-9]*/, '')
  .toUpperCase()
  .match(/[A-Z](?:\d|\d\d|[A-Z]\d|[A-Z]\d\d|\d[A-Z]|[A-Z]\d[A-Z])\s?\d[A-Z][A-Z]/i)
