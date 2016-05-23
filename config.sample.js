module.exports = {
  app_id: process.env.APP_ID || '',
  verify_token: process.env.VERIFY_TOKEN || '',
  access_token: process.env.ACCESS_TOKEN || '',
  hh_token: process.env.HH_TOKEN || '',
  port: process.env.PORT || 5000,
  mongo_db: process.env.MONGODB || '',
}
