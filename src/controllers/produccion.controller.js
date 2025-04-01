/* eslint-disable camelcase */
import ProduccionService from '../services/produccion.service.js'
import { Router } from 'express'

const router = Router()

router.post('/create-produccion', async (req, res) => {
  try {
    const response = await ProduccionService.registrarProduccion(req.body)

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
    const producciones = await ProduccionService.obtenerProduccion()
    res.status(200).json(producciones)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
