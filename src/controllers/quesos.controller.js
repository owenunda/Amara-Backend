/* eslint-disable camelcase */
import QuesosService from '../services/quesos.service.js'
import { Router } from 'express'

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const response = await QuesosService.registrarQuesos(req.body)
    if (response.success) {
      return res.status(201).json({ message: response.message })
    } else {
      return res.status(response.status).json({ Error: response.message })
    }
  } catch (error) {
    return res.status(500).json({ Error: 'Error del servidor' })
  }
})

router.get('/', async (req, res) => {
  try {
    const quesos = await QuesosService.obtenerQuesos()
    res.status(200).json(quesos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await QuesosService.eliminarQueso(id)
    res.status(200).json({ message: 'eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'error del servidor' })
  }
})

export default router
