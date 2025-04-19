/* eslint-disable camelcase */
import QuesosDao from '../dao/quesos.dao.js'

class QuesosService {
  static async obtenerQuesos () {
    return await QuesosDao.obtenerQuesos()
  }

  static async registrarQuesos (data) {
    const { nombre, tipo, cantidad_disponible, ubicacion, precio } = data
    if (!nombre || !tipo || !cantidad_disponible || !ubicacion || !precio) {
      return { success: false, message: 'Todos los campos son obligatorios', status: 400 }
    }
    if (precio <= 0) {
      return { success: false, message: 'El precio del queso debe ser mayor a 0', status: 400 }
    }
    if (cantidad_disponible <= 0) {
      return { success: false, message: 'La cantidad de quesos  debe ser mayor a 0', status: 400 }
    }

    const peso_unidad_kg = 2.5
    return await QuesosDao.registrarQueso(nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio)
  }

  static async eliminarQueso (id) {
    if (typeof (id) === 'number') {
      return { success: false, message: 'la id, tiene que ser un numero' }
    }

    return await QuesosDao.eliminarQueso(id)
  }
}

export default QuesosService
