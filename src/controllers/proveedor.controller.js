/* eslint-disable camelcase */
import Cliente_proveedorService from '../services/cliente_proveedor.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.post('/create', async (req, res, next) => {
  try {
    const response = await Cliente_proveedorService.create(req.body)

    if (response.success) {
      return res.status(201).json({ message: response.message })
    } else {
      return next(new AppError(response.message, response.status))
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const proveedores = await Cliente_proveedorService.obtenerProveedores()
    return res.status(200).json(proveedores)
  } catch (error) {
    next(error)
  }
})

export default router
