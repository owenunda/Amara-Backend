import jwt from 'jsonwebtoken'
import config from '../config/envConfig.js'

function authMiddleware () {
  return (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403) // Token inválido

      req.user = user
      next()
    })
  }
}

export default authMiddleware
