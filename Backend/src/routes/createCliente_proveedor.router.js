import { Router } from 'express'
import { create } from '../controllers/createClienteProveedor.controller.js'

const router = Router()

router.post('/createCltProv', create)

export default router
