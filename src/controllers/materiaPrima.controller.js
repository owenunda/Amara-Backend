import MateriaPrimaService from '../services/materiaPrima.service.js'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const materiaPrimas = await MateriaPrimaService.obtenerMateriasPrimas()
    res.status(201).json(materiaPrimas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/nombres-id', async (req, res) => {
  try {
    const materiaPrimas = await MateriaPrimaService.obtenerIdMateriasPrimas()
    res.status(200).json(materiaPrimas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
