import VentaService from '../services/venta.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.post('/create', async (req, res, next) => {
  try {
    const response = await VentaService.registrarVenta(req.body)
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
    const ventas = await VentaService.obtenerVentas()
    res.status(200).json(ventas)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await VentaService.EliminarVenta(id)
    if (!response.success) {
      return next(new AppError(response.message, 400))
    }
    res.status(200).json({ message: 'Eliminado correctamente' })
  } catch (error) {
    next(error)
  }
})

export default router
