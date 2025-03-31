import quesosController from '../controllers/quesos.controller.js'
import { Router } from 'express'

const router = Router()

router.post('/create-queso', quesosController.registrarQuesos)
router.get('/', quesosController.obtenerQuesos)

export default router
