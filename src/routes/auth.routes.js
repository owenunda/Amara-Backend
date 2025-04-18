import { Router } from 'express'
import { login } from '../controllers/auth.Controller.js'
import jwt from 'jsonwebtoken'
import config from '../config/envConfig.js'

const router = Router()
router.post('/login', login)

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' })
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' })
    }
    res.status(200).json({ message: 'Token válido' })
  })
})

export default router
