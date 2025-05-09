import express from 'express'
import personaRouters from '../controllers/persona.controller.js'
import authRoutes from './auth.routes.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import proveedorRouters from '../controllers/proveedor.controller.js'
import clienteRouters from '../controllers/cliente.controller.js'
import materiaPrimaRouters from '../controllers/materiaPrima.controller.js'
import compraRouters from '../controllers/compra.controller.js'
import quesosRouters from '../controllers/quesos.controller.js'
import ProduccionRouter from '../controllers/produccion.controller.js'
import ventaRouter from '../controllers/venta.controller.js'

const router = express.Router()

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user })
})

router.use('/personas', personaRouters)
router.use('/', authRoutes)

router.use('/cliente', clienteRouters)
router.use('/proveedor', proveedorRouters)
router.use('/materia-prima', materiaPrimaRouters)
router.use('/compra', compraRouters)
router.use('/queso', quesosRouters)
router.use('/produccion', authMiddleware, ProduccionRouter)
router.use('/venta', ventaRouter)

export default router
