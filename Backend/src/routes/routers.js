import express from "express"
import personaRouters from "./persona.routers.js"
import authRoutes from "./auth.routes.js"
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router()

router.use("/personas", personaRouters)
router.use('/', authRoutes);
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user })
})
export default router