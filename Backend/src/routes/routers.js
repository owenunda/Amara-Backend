import express from 'express'
import personaRouters from './persona.routers.js'
import authRoutes from './auth.routes.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import createClientProveedor from './createCliente_proveedor.router.js'
const router = express.Router()

router.use('/personas', personaRouters)
router.use('/', authRoutes)
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user })
})
router.use('/cliente', createClientProveedor)
router.use('/proveedor', createClientProveedor)
export default router
