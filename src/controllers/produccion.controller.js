/* eslint-disable camelcase */
import ProduccionService from '../services/produccion.service.js'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const producciones = await ProduccionService.obtenerProduccion()
    res.status(200).json(producciones)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const produccion = await ProduccionService.obtenerProduccionPorId(id)
    return res.status(200).json(produccion)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await ProduccionService.eliminarProduccion(id)
    res.status(200).json({ message: response.message })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { id_queso, cantidad_producida, responsable, estado, observaciones } = req.body

    const response = await ProduccionService.ModificarProduccion(id, id_queso, cantidad_producida, responsable, estado, observaciones)

    if (response.success) {
      res.status(200).json({ message: response.message })
    } else {
      res.status(400).json({ message: response.message })
    }
  } catch (error) {

  }
})

export default router
