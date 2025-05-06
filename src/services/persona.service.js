/* eslint-disable camelcase */
import PersonaDao from '../dao/persona.dao.js'
import AppError from '../utils/AppError.js'

class PersonaService {
  static async obtenerPersonas () {
    try {
      return await PersonaDao.obtenerPersonas()
    } catch (error) {
      throw new AppError('Error al obtener las personas', 500)
    }
  }

  static async obtenerPersonaPorId (id) {
    try {
      const persona = await PersonaDao.obtenerPersonaPorId(id)
      if (!persona) {
        throw new AppError('Persona no encontrada', 404)
      }
      return persona
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener la persona', 500)
    }
  }

  static async eliminarPersona (id) {
    try {
      const persona = await PersonaDao.obtenerPersonaPorId(id)
      if (!persona) {
        throw new AppError('Persona no encontrada', 404)
      }

      const result = await PersonaDao.eliminarPersona(id)
      return { success: true, message: 'Persona eliminada exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar la persona', 500)
    }
  }

  static async modificarPersona (id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo) {
    try {
      const persona = await PersonaDao.obtenerPersonaPorId(id)
      if (!persona) {
        throw new AppError('Persona no encontrada', 404)
      }

      const result = await PersonaDao.modificarPersona(id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo)
      return { success: true, message: 'Persona modificada exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al modificar la persona', 500)
    }
  }
}

export default PersonaService
