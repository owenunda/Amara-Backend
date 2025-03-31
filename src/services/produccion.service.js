/* eslint-disable camelcase */
import ProduccionDao from '../dao/produccion.dao.js'

class ProduccionService {
  static async registrarProduccion (id_queso, cantidad_producida, responsable, estado, observaciones, detalles) {
    return await ProduccionDao.registrarProduccion(id_queso, cantidad_producida, responsable, estado, observaciones, detalles)
  }

  static async obtenerProduccion () {
    return await ProduccionDao.ObtenerProduccion()
  }
}

export default ProduccionService
