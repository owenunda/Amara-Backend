/* eslint-disable camelcase */
import QuesosService from '../services/quesos.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.post('/create', async (req, res, next) => {
  try {
    const response = await QuesosService.registrarQueso(req.body)
    if (response.success) {
      return res.status(201).json({ message: response.message })
    } else {
      return next(new AppError(response.message, response.status))
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const queso = await QuesosService.obtenerQuesoPorId(id)
    if (!queso) {
      return next(new AppError('Queso no encontrado', 404))
    }
    return res.status(200).json(queso)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const quesos = await QuesosService.obtenerQuesos()
    res.status(200).json(quesos)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg } = req.body
    const response = await QuesosService.ModificarQueso(id, nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg)

    if (response.success) {
      res.status(200).json({ message: response.message })
    } else {
      next(new AppError(response.message, 400))
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await QuesosService.eliminarQueso(id)
    if (!response.success) {
      return next(new AppError(response.message, 400))
    }
    res.status(200).json({ message: 'Eliminado correctamente' })
  } catch (error) {
    next(error)
  }
})

export default router
