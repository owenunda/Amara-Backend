import MateriaPrimaService from '../services/materiaPrima.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const materiaPrimas = await MateriaPrimaService.obtenerMateriasPrimas()
    res.status(200).json(materiaPrimas)
  } catch (error) {
    next(error)
  }
})

router.get('/nombres-id', async (req, res, next) => {
  try {
    const materiaPrimas = await MateriaPrimaService.obtenerIdMateriasPrimas()
    res.status(200).json(materiaPrimas)
  } catch (error) {
    next(error)
  }
})

export default router
