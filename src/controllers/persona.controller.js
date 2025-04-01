import PersonaService from '../services/persona.service.js'
import { Router } from 'express'

const router = Router()

// trae todas las personas
router.get('/', async (req, res) => {
  try {
    const personas = await PersonaService.obtenerPersonas()
    res.json(personas)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error })
  }
})
// trae la persona con un id en especifico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const persona = await PersonaService.obtenerPersonaPorId(id)
    if (!persona) return res.status(404).json({ mensaje: 'usuario no encontrado' })
    res.json(persona)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error })
  }
})

export default router
