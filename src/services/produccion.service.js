/* eslint-disable camelcase */
import ProduccionDao from '../dao/produccion.dao.js'

class ProduccionService {
  static async registrarProduccion (data) {
    const { id_queso, cantidad_producida, responsable, estado, observaciones, detalles } = data

    if (!id_queso || !cantidad_producida || !responsable || !estado || !Array.isArray(detalles)) {
      return { success: false, message: 'Todos los campos son obligatorios y detalles debe ser un array', status: 400 }
    }

    // Validar que el estado sea uno de los permitidos
    const estadosPermitidos = ['en proceso', 'finalizado', 'cancelado']
    if (!estadosPermitidos.includes(estado)) {
      return { success: false, message: `Estado inválido. Debe ser uno de: ${estadosPermitidos.join(', ')}`, status: 400 }
    }

    // Validar que la unidad de medida en cada detalle sea válida
    const unidadesPermitidas = ['kg', 'g', 'L', 'ml', 'unidad']
    for (const detalle of detalles) {
      if (!detalle.id_materia || !detalle.cantidad_usada || !detalle.unidad_medida) {
        return { success: false, message: 'Cada detalle debe contener id_materia, cantidad_usada y unidad_medida', status: 400 }
      }

      if (!unidadesPermitidas.includes(detalle.unidad_medida)) {
        return {
          success: false,
          message: `Unidad de medida inválida (${detalle.unidad_medida}). Debe ser una de: ${unidadesPermitidas.join(', ')}`,
          status: 400
        }
      }
    }

    return await ProduccionDao.registrarProduccion(id_queso, cantidad_producida, responsable, estado, observaciones, detalles)
  }

  static async obtenerProduccion () {
    return await ProduccionDao.ObtenerProduccion()
  }

  static async eliminarProduccion (id) {
    return await ProduccionDao.eliminarProduccion(id)
  }
}

export default ProduccionService
