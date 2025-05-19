/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../dao/usuario.dao.js'
import AppError from '../utils/AppError.js'

export const login = async (req, res, next) => {
  try {
    const { nombre_usuario, password } = req.body

    if (!nombre_usuario || !password) {
      return next(new AppError('Usuario y contraseña son requeridos', 400))
    }

    // Buscar usuario en la base de datos
    const user = await getUserByUsername(nombre_usuario)
    if (!user) {
      return next(new AppError('Credenciales incorrectas', 401))
    }

    // Comparar la contraseña
    if (password !== user.password) {
      return next(new AppError('Contraseña incorrecta', 401))
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id_usuario, username: user.nombre_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ message: 'Login exitoso', token })
  } catch (error) {
    next(error)
  }
}
