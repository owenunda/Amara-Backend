/* eslint-disable camelcase */
import CompraService from '../services/compra.service.js'
import { Router } from 'express'
const router = Router()

router.post('/create-compra', async (req, res) => {
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

export default router
