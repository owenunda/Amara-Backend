/* eslint-disable camelcase */
import CompraService from '../services/compra.service.js'
import { Router } from 'express'
const router = Router()

router.post('/create', async (req, res) => {
  try {
    const response = await CompraService.registrarCompra(req.body)

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
    const compras = await CompraService.ObtenerCompras()
    return res.status(200).json(compras)
  } catch (error) {
    return res.status(500).json({ Error: 'Error del servidor' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await CompraService.EliminarCompra(id)
  res.status(200).json({ message: 'Se ha eliminado correctamente' })
})

export default router
