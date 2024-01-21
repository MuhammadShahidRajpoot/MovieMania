const jwt = require('jsonwebtoken')
const { resError } = require('./response')
const { SECRET_FOR_JWT } = require('../config/config')

function ensureToken(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      jwt.verify(req.token, SECRET_FOR_JWT, async function (err, data) {
        if (err) {
          res.status(403).send(resError('Access Denied', 409))
          console.log('Access Denied')
        } else {
          req.user = data
          next()
        }
      })
    } else {
      res.status(403).send(resError('Access Denied', 409))
    }
  } catch (err) {
    res.send(resError(err, 409))
  }
}

module.exports = ensureToken
