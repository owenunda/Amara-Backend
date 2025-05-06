/* eslint-disable camelcase */
import CompraService from '../services/compra.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.post('/create', async (req, res, next) => {
  try {
    const response = await CompraService.registrarCompra(req.body)

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
    const compras = await CompraService.ObtenerCompras()
    return res.status(200).json(compras)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await CompraService.EliminarCompra(id)
    if (!response.success) {
      return next(new AppError(response.message, 400))
    }
    res.status(200).json({ message: 'Se ha eliminado correctamente' })
  } catch (error) {
    next(error)
  }
})

export default router
