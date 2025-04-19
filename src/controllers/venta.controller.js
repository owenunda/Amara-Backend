import VentaService from '../services/venta.service.js'

import { Router } from 'express'

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const response = await VentaService.registrarVenta(req.body)
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
    const ventas = await VentaService.obtenerVentas()
    res.status(201).json(ventas)
  } catch (error) {
    res.status(500).json({ Error: 'Error del servidor' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await VentaService.EliminarVenta(id)
    res.status(200).json({ message: 'eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'error del servidor' })
  }
})

export default router
