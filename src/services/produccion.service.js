/* eslint-disable camelcase */
import ProduccionDao from '../dao/produccion.dao.js'
import AppError from '../utils/AppError.js'

class ProduccionService {
  static async registrarProduccion (data) {
    const { id_queso, cantidad_producida, responsable, estado, observaciones, detalles } = data

    if (!id_queso || !cantidad_producida || !responsable || !estado || !Array.isArray(detalles)) {
      throw new AppError('Todos los campos son obligatorios y detalles debe ser un array', 400)
    }

    // Validar que el estado sea uno de los permitidos
    const estadosPermitidos = ['en proceso', 'finalizado', 'cancelado']
    if (!estadosPermitidos.includes(estado)) {
      throw new AppError(`Estado inválido. Debe ser uno de: ${estadosPermitidos.join(', ')}`, 400)
    }

    // Validar que la unidad de medida en cada detalle sea válida
    const unidadesPermitidas = ['kg', 'g', 'L', 'ml', 'unidad']
    for (const detalle of detalles) {
      if (!detalle.id_materia || !detalle.cantidad_usada || !detalle.unidad_medida) {
        throw new AppError('Cada detalle debe contener id_materia, cantidad_usada y unidad_medida', 400)
      }

      if (!unidadesPermitidas.includes(detalle.unidad_medida)) {
        throw new AppError(
          `Unidad de medida inválida (${detalle.unidad_medida}). Debe ser una de: ${unidadesPermitidas.join(', ')}`,
          400
        )
      }
    }

    try {
      await ProduccionDao.registrarProduccion(id_queso, cantidad_producida, responsable, estado, observaciones, detalles)
      return { success: true, message: 'Producción registrada exitosamente' }
    } catch (error) {
      throw new AppError('Error al registrar la producción', 500)
    }
  }

  static async obtenerProduccion () {
    try {
      return await ProduccionDao.ObtenerProduccion()
    } catch (error) {
      throw new AppError('Error al obtener las producciones', 500)
    }
  }

  static async obtenerProduccionPorId (id) {
    try {
      const produccion = await ProduccionDao.obtenerProduccionPorId(id)
      if (!produccion) {
        throw new AppError('Producción no encontrada', 404)
      }
      return produccion
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener la producción', 500)
    }
  }

  static async eliminarProduccion (id) {
    try {
      const produccion = await ProduccionDao.obtenerProduccionPorId(id)
      if (!produccion) {
        throw new AppError('Producción no encontrada', 404)
      }

      await ProduccionDao.eliminarProduccion(id)
      return { success: true, message: 'Producción eliminada exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar la producción', 500)
    }
  }

  static async ModificarProduccion (id, id_queso, cantidad_producida, responsable, estado, observaciones) {
    try {
      const produccion = await ProduccionDao.obtenerProduccionPorId(id)
      if (!produccion) {
        throw new AppError('Producción no encontrada', 404)
      }

      await ProduccionDao.ModificarProduccion(id, id_queso, cantidad_producida, responsable, estado, observaciones)
      return { success: true, message: 'Producción modificada exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al modificar la producción', 500)
    }
  }
}

export default ProduccionService
