/* eslint-disable camelcase */
import PersonaService from '../services/persona.service.js'
import { Router } from 'express'
import AppError from '../utils/AppError.js'

const router = Router()

// trae todas las personas
router.get('/', async (req, res, next) => {
  try {
    const personas = await PersonaService.obtenerPersonas()
    res.json(personas)
  } catch (error) {
    next(error)
  }
})
// trae la persona con un id en especifico
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const persona = await PersonaService.obtenerPersonaPorId(id)
    if (!persona) {
      return next(new AppError('Usuario no encontrado', 404))
    }
    res.json(persona)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const persona = await PersonaService.obtenerPersonaPorId(id)
    if (!persona) {
      return next(new AppError('Usuario no encontrado', 404))
    }

    const response = await PersonaService.eliminarPersona(id)
    res.status(200).json({ message: response.message })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo } = req.body
    const response = await PersonaService.modificarPersona(id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo)

    if (response.success) {
      res.status(200).json({ message: response.message })
    } else {
      next(new AppError(response.message, 400))
    }
  } catch (error) {
    next(error)
  }
})

export default router
