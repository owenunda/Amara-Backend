import { Router } from 'express'
import produccionController from '../controllers/produccion.controller.js'

const router = Router()

router.post('/create-produccion', produccionController.registrarProduccion)
router.get('/', produccionController.obtenerProduccion)

export default router
