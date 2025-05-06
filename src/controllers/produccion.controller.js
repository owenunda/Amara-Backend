/* eslint-disable camelcase */
import ProduccionService from '../services/produccion.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const producciones = await ProduccionService.obtenerProduccion()
    res.status(200).json(producciones)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const produccion = await ProduccionService.obtenerProduccionPorId(id)
    if (!produccion) {
      return next(new AppError('Producción no encontrada', 404))
    }
    return res.status(200).json(produccion)
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const response = await ProduccionService.registrarProduccion(req.body)
    if (response.success) {
      return res.status(201).json({ message: response.message })
    } else {
      return next(new AppError(response.message, response.status))
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await ProduccionService.eliminarProduccion(id)
    if (!response.success) {
      return next(new AppError(response.message, 400))
    }
    res.status(200).json({ message: response.message })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { id_queso, cantidad_producida, responsable, estado, observaciones } = req.body
    const response = await ProduccionService.ModificarProduccion(id, id_queso, cantidad_producida, responsable, estado, observaciones)

    if (response.success) {
      res.status(200).json({ message: response.message })
    } else {
      next(new AppError(response.message, 400))
    }
  } catch (error) {
    next(error)
  }
})

export default router
