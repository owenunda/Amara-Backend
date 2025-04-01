/* eslint-disable camelcase */
import Cliente_proveedorService from '../services/cliente_proveedor.service.js'
import { Router } from 'express'

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const response = await Cliente_proveedorService.create(req.body)

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
