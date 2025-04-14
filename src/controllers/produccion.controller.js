/* eslint-disable camelcase */
import ProduccionService from '../services/produccion.service.js'
import { Router } from 'express'

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const response = await ProduccionService.registrarProduccion(req.body)
    console.log(response)
    if (response.success) {
      return res.status(201).json({ message: response.message })
    } else {
      return res.status(response.status).json({ error: response.message })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error del servidor' })
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await ProduccionService.eliminarProduccion(id)
    if (!response.success) {
      res.status(400).json({ message: response.message })
    } else {
      res.status(200).json({ message: response.message })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

export default router
