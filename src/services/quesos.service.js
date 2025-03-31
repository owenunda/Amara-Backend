/* eslint-disable camelcase */
import QuesosDao from '../dao/quesos.dao.js'

class QuesosService {
  static async obtenerQuesos () {
    return await QuesosDao.obtenerQuesos()
  }

  static async registrarQuesos (nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio) {
    return await QuesosDao.registrarQueso(nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio)
  }
}

export default QuesosService
