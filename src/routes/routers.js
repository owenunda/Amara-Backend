import express from 'express'
import personaRouters from '../controllers/persona.controller.js'
import authRoutes from './auth.routes.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import createClientProveedor from '../controllers/createClienteProveedor.controller.js'
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

router.use('/cliente', createClientProveedor)
router.use('/proveedor', createClientProveedor)
router.use('/materias-primas', materiaPrimaRouters)
router.use('/compra', compraRouters)
router.use('/quesos', quesosRouters)
router.use('/produccion', ProduccionRouter)
router.use('/venta', ventaRouter)

export default router
