import PersonaService from '../services/persona.service.js'
import { Router } from 'express'

const router = Router()

// trae todas las personas
router.get('/', async (req, res) => {
  try {
    const personas = await PersonaService.obtenerPersonas()
    res.json(personas)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
})
// trae la persona con un id en especifico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const persona = await PersonaService.obtenerPersonaPorId(id)
    if (!persona) return res.status(404).json({ message: 'usuario no encontrado' })
    res.json(persona)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const persona = await PersonaService.obtenerPersonaPorId(id)
    if (!persona) return res.status(404).json({ message: 'usuario no encontrado' })

    const response = await PersonaService.eliminarPersona(id)
    if (!response.success) {
      return res.status(200).json({ message: response.message })
    } else {
      res.status(200).json({ message: response.message })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

export default router
